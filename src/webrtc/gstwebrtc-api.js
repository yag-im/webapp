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

import defaultConfig from "./config.js";
import ComChannel from "./com-channel.js";
import SessionState from "./session-state.js";

/**
 * @class GstWebRTCAPI
 * @classdesc The API entry point that manages a WebRTC.
 */
export default class GstWebRTCAPI {
  /**
   * @constructor GstWebRTCAPI
   * @param {GstWebRTCConfig} [userConfig] - The user configuration.<br>Only the parameters different from the default
   * ones need to be provided.
   */
  constructor(userConfig) {
    console.log("[webrtc:gstwebrtc-api] entering GstWebRTCAPI ctor");
    this._channel = null;
    this._producers = {};
    this._connectionListeners = [];
    this._producersListeners = [];

    const config = Object.assign({}, defaultConfig);
    if (userConfig && (typeof (userConfig) === "object")) {
      Object.assign(config, userConfig);
    }

    if (typeof (config.meta) !== "object") {
      config.meta = null;
    }

    this._config = config;
    this.connectChannel();
  }

  /**
   * @interface GstWebRTCAPI.ConnectionListener
   */
  /**
   * Callback method called when this client connects to the WebRTC signaling server.
   * The callback implementation should not throw any exception.
   * @method GstWebRTCAPI.ConnectionListener#connected
   * @abstract
   * @param {string} clientId - The unique identifier of this WebRTC client.<br>This identifier is provided by the
   * signaling server to uniquely identify each connected peer.
   */
  /**
   * Callback method called when this client disconnects from the WebRTC signaling server.
   * The callback implementation should not throw any exception.
   * @method GstWebRTCAPI.ConnectionListener#disconnected
   * @abstract
   */

  /**
   * Registers a connection listener that will be called each time the WebRTC API connects to or disconnects from the
   * signaling server.
   * @method GstWebRTCAPI#registerConnectionListener
   * @param {GstWebRTCAPI.ConnectionListener} listener - The connection listener to register.
   * @returns {boolean} true in case of success (or if the listener was already registered), or false if the listener
   * doesn't implement all callback functions and cannot be registered.
   */
  registerConnectionListener(listener) {
    console.log("[webrtc:gstwebrtc-api] entering registerConnectionListener");
    if (!listener || (typeof (listener) !== "object") ||
      (typeof (listener.connected) !== "function") ||
      (typeof (listener.disconnected) !== "function")) {
      return false;
    }

    if (!this._connectionListeners.includes(listener)) {
      this._connectionListeners.push(listener);
    }

    return true;
  }

  /**
   * Unregisters a connection listener.<br>
   * The removed listener will never be called again and can be garbage collected.
   * @method GstWebRTCAPI#unregisterConnectionListener
   * @param {GstWebRTCAPI.ConnectionListener} listener - The connection listener to unregister.
   * @returns {boolean} true if the listener is found and unregistered, or false if the listener was not previously
   * registered.
   */
  unregisterConnectionListener(listener) {
    console.log("[webrtc:gstwebrtc-api] entering unregisterConnectionListener");
    const idx = this._connectionListeners.indexOf(listener);
    if (idx >= 0) {
      this._connectionListeners.splice(idx, 1);
      return true;
    }

    return false;
  }

  /**
   * Unregisters all previously registered connection listeners.
   * @method GstWebRTCAPI#unregisterAllConnectionListeners
   */
  unregisterAllConnectionListeners() {
    console.log("[webrtc:gstwebrtc-api] entering unregisterAllConnectionListeners");
    this._connectionListeners = [];
  }

  /**
   * Creates a new producer session.
   * <p>You can only create one producer session at a time.<br>
   * To request streaming from a new stream you will first need to close the previous producer session.</p>
   * <p>You can only request a producer session while you are connected to the signaling server. You can use the
   * {@link GstWebRTCAPI.ConnectionListener} interface and {@link GstWebRTCAPI#registerConnectionListener} method to
   * listen to the connection state.</p>
   * @method GstWebRTCAPI#createProducerSession
   * @param {external:MediaStream} stream - The audio/video stream to offer as a producer through WebRTC.
   * @returns {GstWebRTCAPI.ProducerSession} The created producer session or null in case of error. To start streaming,
   * you still need to call {@link GstWebRTCAPI.ProducerSession#start} after adding on the returned session all the event
   * listeners you may need.
   */
  createProducerSession(stream) {
    if (this._channel) {
      return this._channel.createProducerSession(stream);
    }
    return null;
  }

  /**
   * Information about a remote producer registered by the signaling server.
   * @typedef {object} GstWebRTCAPI.Producer
   * @readonly
   * @property {string} id - The remote producer unique identifier set by the signaling server (always non-empty).
   * @property {object} meta - Free-form object containing extra information about the remote producer (always non-null,
   * but may be empty). Its content depends on your application.
   */

  /**
   * Gets the list of all remote WebRTC producers available on the signaling server.
   * <p>The remote producers list is only populated once you've connected to the signaling server. You can use the
   * {@link GstWebRTCAPI.ConnectionListener} interface and {@link GstWebRTCAPI#registerConnectionListener} method to
   * listen to the connection state.</p>
   * @method GstWebRTCAPI#getAvailableProducers
   * @returns {GstWebRTCAPI.Producer[]} The list of remote WebRTC producers available.
   */
  getAvailableProducers() {
    return Object.values(this._producers);
  }

  /**
   * @interface GstWebRTCAPI.ProducersListener
   */
  /**
   * Callback method called when a remote producer is added on the signaling server.
   * The callback implementation should not throw any exception.
   * @method GstWebRTCAPI.ProducersListener#producerAdded
   * @abstract
   * @param {GstWebRTCAPI.Producer} producer - The remote producer added on server-side.
   */
  /**
   * Callback method called when a remote producer is removed from the signaling server.
   * The callback implementation should not throw any exception.
   * @method GstWebRTCAPI.ProducersListener#producerRemoved
   * @abstract
   * @param {GstWebRTCAPI.Producer} producer - The remote producer removed on server-side.
   */

  /**
   * Registers a producers listener that will be called each time a producer is added or removed on the signaling
   * server.
   * @method GstWebRTCAPI#registerProducersListener
   * @param {GstWebRTCAPI.ProducersListener} listener - The producer listener to register.
   * @returns {boolean} true in case of success (or if the listener was already registered), or false if the listener
   * doesn't implement all callback functions and cannot be registered.
   */
  registerProducersListener(listener) {
    console.log("[webrtc:gstwebrtc-api] entering registerProducersListener");
    if (!listener || (typeof (listener) !== "object") ||
      (typeof (listener.producerAdded) !== "function") ||
      (typeof (listener.producerRemoved) !== "function")) {
      return false;
    }

    if (!this._producersListeners.includes(listener)) {
      this._producersListeners.push(listener);
    }

    return true;
  }

  /**
   * Unregisters a producers listener.<br>
   * The removed listener will never be called again and can be garbage collected.
   * @method GstWebRTCAPI#unregisterProducersListener
   * @param {GstWebRTCAPI.ProducersListener} listener - The producers listener to unregister.
   * @returns {boolean} true if the listener is found and unregistered, or false if the listener was not previously
   * registered.
   */
  unregisterProducersListener(listener) {
    const idx = this._producersListeners.indexOf(listener);
    if (idx >= 0) {
      this._producersListeners.splice(idx, 1);
      return true;
    }

    return false;
  }

  /**
   * Unregisters all previously registered producers listeners.
   * @method GstWebRTCAPI#unregisterAllProducersListeners
   */
  unregisterAllProducersListeners() {
    this._producersListeners = [];
  }

  /**
   * Creates a consumer session by connecting the local client to a remote WebRTC producer.
   * <p>You can only create one consumer session per remote producer.</p>
   * <p>You can only request a new consumer session while you are connected to the signaling server. You can use the
   * {@link GstWebRTCAPI.ConnectionListener} interface and {@link GstWebRTCAPI#registerConnectionListener} method to
   * listen to the connection state.</p>
   * @method GstWebRTCAPI#createConsumerSession
   * @param {string} producerId - The unique identifier of the remote producer to connect to.
   * @returns {GstWebRTCAPI.ConsumerSession} The WebRTC session between the selected remote producer and this local
   * consumer, or null in case of error. To start connecting and receiving the remote streams, you still need to call
   * {@link GstWebRTCAPI.ConsumerSession#connect} after adding on the returned session all the event listeners you may
   * need.
   */
  createConsumerSession(producerId, sessionId) {
    console.log("[webrtc:gstwebrtc-api] entering createConsumerSession");
    if (this._channel) {
      return this._channel.createConsumerSession(producerId, sessionId);
    }
    return null;
  }

  createSession(appReleaseUuid, preferredDCs) {
    console.log("[webrtc:gstwebrtc-api] entering createSession");
    if (this._channel) {
      return this._channel.createSession(appReleaseUuid, preferredDCs);
    }
    return null;
  }

  getSessions() {
    console.log("[webrtc:gstwebrtc-api] entering getSessions");
    if (this._channel) {
      return this._channel.getSessions();
    }
    return null;
  }

  getSession(sessionId) {
    if (this._channel) {
      return this._channel.getSession(sessionId);
    }
    return null;
  }

  endSession(sessionId, soft=false) {
    console.log("[webrtc:gstwebrtc-api] entering endSession");
    if (this._channel) {
      return this._channel.endSession(sessionId, soft);
    }
    return null;
  }

  connectChannel() {
    console.log("[webrtc:gstwebrtc-api] entering connectChannel");
    if (this._channel) {
      const oldChannel = this._channel;
      this._channel = null;
      oldChannel.close();
      for (const key in this._producers) {
        this.triggerProducerRemoved(key);
      }
      this._producers = {};
      this.triggerDisconnected();
    }

    this._channel = new ComChannel(
      this._config.signalingServerUrl,
      this._config.meta,
      this._config.webrtcConfig
    );

    this._channel.addEventListener("error", (event) => {
      if (event.target === this._channel) {
        console.error(event.message, event.error);
        this.triggerError(event);
      }
    });

    this._channel.addEventListener("closed", (event) => {
      if (event.target !== this._channel) {
        return;
      }
      this._channel = null;
      for (const key in this._producers) {
        this.triggerProducerRemoved(key);
      }
      this._producers = {};
      this.triggerDisconnected();
      if (this._config.reconnectionTimeout > 0) {
        window.setTimeout(() => {
          this.connectChannel();
        }, this._config.reconnectionTimeout);
      }
    });

    this._channel.addEventListener("ready", (event) => {
      if (event.target === this._channel) {
        this.triggerConnected(this._channel.channelId);
      }
    });

    this._channel.addEventListener("producerAdded", (event) => {
      if (event.target === this._channel) {
        this.triggerProducerAdded(event.detail);
      }
    });

    this._channel.addEventListener("producerRemoved", (event) => {
      if (event.target === this._channel) {
        this.triggerProducerRemoved(event.detail.id);
      }
    });

    this._channel.addEventListener("sessionCreated", (event) => {
      if (event.target === this._channel) {
        this.triggerSessionCreated(event.detail);
      }
    });

    this._channel.addEventListener("sessionsList", (event) => {
      if (event.target === this._channel) {
        this.triggerSessionsList(event.detail);
      }
    });

    this._channel.addEventListener("session", (event) => {
      if (event.target === this._channel) {
        this.triggerSession(event.detail);
      }
    });

    this._channel.addEventListener("sessionEnded", (event) => {
      if (event.target === this._channel) {
        this.triggerSessionEnded(event.detail);
      }
    });
  }

  triggerConnected(clientId) {
    for (const listener of this._connectionListeners) {
      try {
        listener.connected(clientId);
      } catch (ex) {
        console.error("a listener callback should not throw any exception", ex);
      }
    }
  }

  triggerDisconnected() {
    for (const listener of this._connectionListeners) {
      try {
        listener.disconnected();
      } catch (ex) {
        console.error("a listener callback should not throw any exception", ex);
      }
    }
  }

  triggerProducerAdded(producer) {
    if (producer.id in this._producers) {
      return;
    }

    this._producers[producer.id] = producer;
    for (const listener of this._producersListeners) {
      try {
        listener.producerAdded(producer);
      } catch (ex) {
        console.error("a listener callback should not throw any exception", ex);
      }
    }
  }

  triggerProducerRemoved(producerId) {
    if (producerId in this._producers) {
      const producer = this._producers[producerId];
      delete this._producers[producerId];

      for (const listener of this._producersListeners) {
        try {
          listener.producerRemoved(producer);
        } catch (ex) {
          console.error("a listener callback should not throw any exception", ex);
        }
      }
    }
  }

  triggerSessionCreated(sessionId) {
    for (const listener of this._producersListeners) {
      try {
        listener.sessionCreated(sessionId);
      } catch (ex) {
        console.error("a listener callback should not throw any exception", ex);
      }
    }
  }

  triggerSessionsList(sessions) {
    for (const listener of this._producersListeners) {
      try {
        listener.sessionsList(sessions);
      } catch (ex) {
        console.error("a listener callback should not throw any exception", ex);
      }
    }
  }

  triggerSession(session) {
    for (const listener of this._producersListeners) {
      try {
        listener.session(session);
      } catch (ex) {
        console.error("a listener callback should not throw any exception", ex);
      }
    }
  }

  triggerError(event) {
    for (const listener of this._producersListeners) {
      try {
        listener.onError(event);
      } catch (ex) {
        console.error("a listener callback should not throw any exception", ex);
      }
    }
  }

  triggerSessionEnded(sessionId) {
    for (const listener of this._producersListeners) {
      try {
        listener.sessionEnded(sessionId);
      } catch (ex) {
        console.error("a listener callback should not throw any exception", ex);
      }
    }
  }
}

GstWebRTCAPI.SessionState = SessionState;
