/*
 * gstwebrtc-api
 *
 * Copyright (C) 2022 Igalia S.L. <info@igalia.com>
 *   Author: Loïc Le Page <llepage@igalia.com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Proxies requests from gstwebrtc-api into the WebSocket channel;
 * Returns responses from WebSocket channel via EventTarget.dispatchEvent() (gstwebrtc-api registers callbacks via this._channel.addEventListener)
 * Creates ConsumerSession;
 */

import ConsumerSession from "./consumer-session.js";

const SignallingServerMessageType = Object.freeze({
  welcome: "welcome",
  peerStatusChanged: "peerStatusChanged",
  list: "list",
  sessionStarted: "sessionStarted",
  peer: "peer",
  startSession: "startSession",
  endSession: "endSession",
  error: "error",
  sessionCreated: "sessionCreated",
  sessionsList: "sessionsList",
  session: "session",
  sessionEnded: "sessionEnded",
});

function normalizeProducer(producer, excludedId) {
  if (!producer || (typeof (producer) !== "object")) {
    return null;
  }

  const normalizedProducer = {
    id: "",
    meta: {}
  };

  if (producer.id && (typeof (producer.id) === "string")) {
    normalizedProducer.id = producer.id;
  } else if (producer.peerId && (typeof (producer.peerId) === "string")) {
    normalizedProducer.id = producer.peerId;
  } else {
    return null;
  }

  if (normalizedProducer.id === excludedId) {
    return null;
  }

  if (producer.meta && (typeof (producer.meta) === "object")) {
    normalizedProducer.meta = producer.meta;
  }

  Object.freeze(normalizedProducer.meta);
  return Object.freeze(normalizedProducer);
}

export default class ComChannel extends EventTarget {
  constructor(url, meta, webrtcConfig) {
    console.log("[webrtc:com-channel] entering ComChannel ctor");
    super();

    this._meta = meta;
    this._webrtcConfig = webrtcConfig;
    this._ws = new WebSocket(url);
    this._ready = false;
    this._channelId = "";
    this._producerSession = null;
    this._consumerSessions = {};

    this._ws.onerror = (event) => {
      console.log("[webrtc:com-channel] entering ComChannel._ws.onerror");
      this.dispatchEvent(new ErrorEvent("error", {
        message: event.message || "WebSocket error",
        error: event.error || new Error(
          this._ready ? "transportation error" : "cannot connect to signaling server")
      }));
      this.close();
    };

    this._ws.onclose = () => {
      console.log("[webrtc:com-channel] entering ComChannel._ws.onclose");
      this._ready = false;
      this._channelId = "";
      this._ws = null;

      this.closeAllConsumerSessions();

      if (this._producerSession) {
        this._producerSession.close();
        this._producerSession = null;
      }

      this.dispatchEvent(new Event("closed"));
    };

    this._ws.onmessage = (event) => {
      console.log(`[webrtc:com-channel] entering ComChannel._ws.onmessage: ${event.data}`);
      try {
        const msg = JSON.parse(event.data);
        if (msg && (typeof (msg) === "object")) {
          switch (msg.type) {

          case SignallingServerMessageType.welcome:
            this._channelId = msg.peerId;
            try {
              // TODO: can't use this.send() here cos it checks for `this._ready` flag which is false at that point
              this._ws.send(JSON.stringify({
                type: "setPeerStatus",
                roles: ["listener"],
                meta: meta
              }));
            } catch (ex) {
              this.dispatchEvent(new ErrorEvent("error", {
                message: "cannot initialize connection to signaling server",
                error: ex
              }));
              this.close();
            }
            break;

          case SignallingServerMessageType.peerStatusChanged:
            if (msg.peerId === this._channelId) {
              if (!this._ready && msg.roles.includes("listener")) {
                this._ready = true;
                this.dispatchEvent(new Event("ready"));
                // this.send({ type: "list" });
              }

              if (this._producerSession && msg.roles.includes("producer")) {
                this._producerSession.onProducerRegistered();
              }
            } else {
              const normalizedProducer = normalizeProducer(msg, this._channelId);
              if (normalizedProducer) {
                if (msg.roles.includes("producer")) {
                  this.dispatchEvent(new CustomEvent("producerAdded", { detail: normalizedProducer }));
                } else {
                  this.dispatchEvent(new CustomEvent("producerRemoved", { detail: normalizedProducer }));
                }
              }
            }
            break;

          case SignallingServerMessageType.list:
            for (const producer of msg.producers) {
              const normalizedProducer = normalizeProducer(producer, this._channelId);
              if (normalizedProducer) {
                this.dispatchEvent(new CustomEvent("producerAdded", { detail: normalizedProducer }));
              }
            }
            break;

          case SignallingServerMessageType.sessionCreated:
            {
              this.dispatchEvent(new CustomEvent("sessionCreated", { detail: msg.session_id }));
            }
            break;

          case SignallingServerMessageType.sessionEnded:
            {
              this.dispatchEvent(new CustomEvent("sessionEnded", { detail: msg.session_id }));
            }
            break;

          case SignallingServerMessageType.sessionStarted:
            {
              const session = this.getConsumerSession(msg.peerId);
              if (session) {
                delete this._consumerSessions[msg.peerId];

                session.onSessionStarted(msg.peerId, msg.sessionId);
                if (session.sessionId && !(session.sessionId in this._consumerSessions)) {
                  this._consumerSessions[session.sessionId] = session;
                } else {
                  session.close();
                }
              }
            }
            break;

          case SignallingServerMessageType.peer:
            {
              const session = this.getConsumerSession(msg.sessionId);
              if (session) {
                session.onSessionPeerMessage(msg);
              } else if (this._producerSession) {
                this._producerSession.onSessionPeerMessage(msg);
              }
            }
            break;

          case SignallingServerMessageType.startSession:
            if (this._producerSession) {
              this._producerSession.onStartSessionMessage(msg);
            }
            break;

          case SignallingServerMessageType.endSession:
            {
              const session = this.getConsumerSession(msg.sessionId);
              if (session) {
                session.close();
              } else if (this._producerSession) {
                this._producerSession.onEndSessionMessage(msg);
              }

              /*
                closing ComCannel is required to reestablish connection with sigsvc
                usually when this event occurs, peer-consumer is deleted on the sigsvc side and it becomes "unconnectable"
                ConsumerSession (WebRTCSession) will be also closed from the close() handler
              */
              //this.close();
            }
            break;
          
          case SignallingServerMessageType.sessionsList:
            {
              this.dispatchEvent(new CustomEvent("sessionsList", { detail: msg.sessions }));
            }
            break;
          
          case SignallingServerMessageType.session:
            {
              this.dispatchEvent(new CustomEvent("session", { detail: msg.session }));
            }
            break;

          case SignallingServerMessageType.error:
            this.dispatchEvent(new ErrorEvent("error", {
              message: "error received from signaling server",
              error: new Error(msg.message),
            }));
            break;

          default:
            throw new Error(`unknown message type: "${msg.type}"`);
          }
        }
      } catch (ex) {
        this.dispatchEvent(new ErrorEvent("error", {
          message: "cannot parse incoming message from signaling server",
          error: ex
        }));
      }
    };
  }

  get meta() {
    return this._meta;
  }

  get webrtcConfig() {
    return this._webrtcConfig;
  }

  get ready() {
    return this._ready;
  }

  get channelId() {
    return this._channelId;
  }

  get producerSession() {
    return this._producerSession;
  }

  createProducerSession(stream) {
    console.log("[webrtc:com-channel] entering createProducerSession");
    if (!this._ready || !(stream instanceof MediaStream)) {
      return null;
    }

    if (this._producerSession) {
      if (this._producerSession.stream === stream) {
        return this._producerSession;
      } else {
        return null;
      }
    }

    const session = new ProducerSession(this, stream);
    this._producerSession = session;

    session.addEventListener("closed", () => {
      console.log("[webrtc:com-channel] entering closed event handler");
      if (this._producerSession === session) {
        this._producerSession = null;
      }
    });

    return session;
  }

  createConsumerSession(producerId, sessionId) {
    console.log("[webrtc:com-channel] entering createConsumerSession");
    if (!this._ready || !producerId || (typeof (producerId) !== "string") || !sessionId) {
      return null;
    }

    if (producerId in this._consumerSessions) {
      return this._consumerSessions[producerId];
    }

    for (const session of Object.values(this._consumerSessions)) {
      if (session.peerId === producerId) {
        return session;
      }
    }

    const session = new ConsumerSession(producerId, this, sessionId);
    this._consumerSessions[producerId] = session;

    session.addEventListener("closed", (event) => {
      let sessionId = event.target.sessionId;
      if (!sessionId) {
        sessionId = event.target.peerId;
      }

      if ((sessionId in this._consumerSessions) && (this._consumerSessions[sessionId] === session)) {
        delete this._consumerSessions[sessionId];
      }
    });

    return session;
  }

  createSession(appReleaseUuid, preferredDCs) {
    console.log("[webrtc:com-channel] entering createSession");
    const msg = {
      type: "createSession",
      app_release_uuid: appReleaseUuid,
      preferred_dcs: preferredDCs,
    };
    if (!this.send(msg)) {
      this.dispatchEvent(new ErrorEvent("error", {
        message: "cannot create session",
        error: new Error("cannot send createSession message to signaling server"),
      }));
      this.close();
    }
  }

  getSessions() {
    console.log("[webrtc:com-channel] entering getSessions");
    const msg = {
      type: "getSessions"
    };
    if (!this.send(msg)) {
      this.dispatchEvent(new ErrorEvent("error", {
        message: "cannot get sessions",
        error: new Error("cannot send getSessions message to signaling server"),
      }));
      this.close();
    }
  }

  getSession(sessionId) {
    console.log("[webrtc:com-channel] entering getSession");
    const msg = {
      type: "getSession",
      sessionId: sessionId,
    };
    if (!this.send(msg)) {
      this.dispatchEvent(new ErrorEvent("error", {
        message: "cannot get session",
        error: new Error("cannot send getSession message to signaling server"),
      }));
      this.close();
    }
  }

  endSession(sessionId, soft) {
    console.log("[webrtc:com-channel] entering endSession");
    const msg = {
      type: "endSession",
      sessionId: sessionId,
      soft: soft,
    };
    if (!this.send(msg)) {
      this.dispatchEvent(new ErrorEvent("error", {
        message: "cannot end session",
        error: new Error("cannot send endSession message to signaling server"),
      }));
      this.close();
    }
  }

  getConsumerSession(sessionId) {
    if (sessionId in this._consumerSessions) {
      return this._consumerSessions[sessionId];
    } else {
      return null;
    }
  }

  closeAllConsumerSessions() {
    console.log("[webrtc:com-channel] entering closeAllConsumerSessions");
    for (const session of Object.values(this._consumerSessions)) {
      session.close();
    }

    this._consumerSessions = {};
  }

  send(data) {
    if (this._ready && data && (typeof (data) === "object")) {
      try {
        this._ws.send(JSON.stringify(data));
        return true;
      } catch (ex) {
        this.dispatchEvent(new ErrorEvent("error", {
          message: "cannot send message to signaling server",
          error: ex
        }));
      }
    }

    return false;
  }

  close() {
    console.log("[webrtc:com-channel] entering close");
    if (this._ws) {
      this._ready = false;
      this._channelId = "";
      this._ws.close();

      this.closeAllConsumerSessions();

      if (this._producerSession) {
        this._producerSession.close();
        this._producerSession = null;
      }
    }
  }
}
