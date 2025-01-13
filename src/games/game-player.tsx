'use client';

import { SignInDialog } from "@/account/signin";
import GstWebRTCAPI from "@/webrtc/gstwebrtc-api";
import { PlayArrow } from '@mui/icons-material';
import { Box, Button, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from "react";
import type { GameReleaseDetailsProps } from "./game-details";
import { getGameDetails } from "./game-details-query";
import ExitGameDialog from "./game-exit";
import { exitFullscreen, getUserProfile, hideCursor, isFullScreen, lockKeyboard, lockPointer, requestFullscreen, showDefaultCursor, showWaitCursor } from "./game-player-helpers";
import ResumeGameDialog from "./game-resume";
import SafariWarningDialog from "./safari-warning";


type GameSession = {
  app_release_uuid: string;
  container: {
    id: string;
    node_id: string;
    region: string;
  };
  updated: string;
  user_id: number;
  ws_conn: {
    id: string;
    consumer_id: string;
    producer_id: string;
  };
  id: string;
  status: string;
  ending: boolean;
}

export function GamePlayer(gameDetails: GameReleaseDetailsProps) {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [showResumeGameDialog, setShowResumeGameDialog] = useState(false);
  const [showExitGameDialog, setShowExitGameDialog] = useState(false);
  const [showLoadingMsg, setShowLoadingMsg] = useState(false);
  const [showSafariWarningDialog, setShowSafariWarningDialog] = useState(false);

  const videoElementRef = useRef<React.ElementRef<'video'>>(null);
  const gamePlayerContainerRef = useRef<React.ElementRef<'div'>>(null);
  const webRtcApi = useRef<GstWebRTCAPI | null>(null);
  const orphanedSession = useRef<GameSession | null>(null);
  const orphanedGameDetails = useRef<GameReleaseDetailsProps | null>(null);
  const nextGameReleaseUuid = useRef<string | null | undefined>(null);
  const activeSessionId = useRef<string | null>(null);
  const nextUrl = useRef<string | null>(null);

  function createSessionWrap(appReleaseUuid: string) {
    // initiate new session creation (async);
    // once session is created, sessionCreated cb will be called (sets a new activeSessionId)
    // finally, producerAdded cb will be called and gameplay stream will start
    showWaitCursor();
    webRtcApi.current?.createSession(appReleaseUuid, null);
  }

  function endSessionWrap(sessionId: string, soft: boolean = false) {
    // initiate ending of existing session (async);
    // once session is ended, sessionEnded cb will be called
    showWaitCursor();
    webRtcApi.current?.endSession(sessionId, soft);
  }

  function requestFullscreenWrap(waitMode: boolean = true) {
    setShowPlayButton(false);
    if (waitMode) {
      showWaitCursor();
      setShowLoadingMsg(true);
    } else {
      hideCursor();
    }
    // Workaround to avoid pausing (space button) while in a full-screen mode
    videoElementRef.current?.addEventListener('pause', (e) => {
      videoElementRef.current?.play().catch(error => {
        console.error('[GamePlayer] error while playing after pause:', error);
      });
    });
    // Lock pointer (for certain games, mostly Win9x on dosbox-x)
    // Should be called before switching to the fullscreen: 
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/requestPointerLock
    if (gameDetails.app_reqs.ua.lock_pointer) {
      lockPointer(videoElementRef.current);
    }
    requestFullscreen(gamePlayerContainerRef.current, () => {
      // on exit fullscreen cb handler
      showDefaultCursor();
      // activeSessionId.current can be null if game was exited the natural way (e.g. through the game menu)
      if (activeSessionId.current) {
        // there is an active session, e.g. user has long-pressed the Esc button
        setShowExitGameDialog(true);
        return;
      }
      window.location.reload();
    });
    // Lock keyboard (long-press Esc to exit fullscreen)
    // not always defined, even in Chrome (on Mac)
    lockKeyboard();
  }

  function endOrphanedSession(nextUuid: string, soft: boolean = false) {
    nextGameReleaseUuid.current = nextUuid;
    if (orphanedSession.current) {
      endSessionWrap(orphanedSession.current.id, soft);
      orphanedSession.current = null;
      orphanedGameDetails.current = null;
    } else {
      console.error("[GamePlayer] invalid state: no orphaned session");
    }
  }

  function restoreOrphanedSession() {
    if (!webRtcApi.current || !orphanedSession.current || !orphanedGameDetails.current) {
      console.error("[GamePlayer] invalid state: no orphaned session");
      return;
    }
    if (orphanedSession.current.status === 'paused') {
      // paused session can be started right away
      createSessionWrap(orphanedSession.current.app_release_uuid);
    } else if (orphanedSession.current.status === 'active') {
      // an active orphaned session should be paused first (soft closed), then started again
      endOrphanedSession(orphanedGameDetails.current.uuid, true);
    }
    orphanedSession.current = null;
  }

  function initRemoteStreams() {
    console.log("[GamePlayer] entering initRemoteStreams")

    const listener = {
      onError(errEvent: { error: { message: string; }; }) {
        console.error(`[GamePlayer] webRtcApi listener catched an error: ${errEvent.error.message}`);
      },

      async sessionsList(sessions: GameSession[]) {
        console.log("[GamePlayer] entering sessionsList callback");
        if (Array.isArray(sessions)) {
          if (sessions.length === 1) {
            console.log(`[GamePlayer] orphaned sessions has been found`);
            orphanedSession.current = sessions[0]; // TODO: MVP: there can be only one paused or active session
            const { gameDetails } = await getGameDetails(orphanedSession.current.app_release_uuid);
            orphanedGameDetails.current = gameDetails;
            showDefaultCursor();
            setShowResumeGameDialog(true);
            return;
          } else if (sessions.length > 1) {
            console.error(`[GamePlayer] more than one orphaned session has been found`);
            return;
          }
        }
        console.log("[GamePlayer] no orphaned sessions has been found, proceeding with creating a new session");
        requestFullscreenWrap();
        createSessionWrap(gameDetails.uuid);
      },

      sessionCreated(sid: string) {
        console.log("[GamePlayer] entering sessionCreated callback");
        console.log(`[GamePlayer] session ${sid} was created, awaiting for producer to start a stream`);
        activeSessionId.current = sid;
      },

      producerAdded(producer: any) {
        console.log(`[GamePlayer] entering producerAdded callback (producer id: ${producer.id})`);
        const producerId: string = producer.id;
        const session = webRtcApi.current?.createConsumerSession(producerId, activeSessionId.current);
        if (session) {
          session.addEventListener("error", (event: any) => {
            console.log(`[GamePlayer] entering 'session error' callback (session id: ${session._sessionId}`);
            console.error(event.message, event.error);
          });

          session.addEventListener("closed", async () => {
            console.log(`[GamePlayer] entering 'session closed' callback (session id: ${session._sessionId}`);
            activeSessionId.current = null;
            if (!videoElementRef.current) {
              console.error("[GamePlayer] videoElement is null")
              return;
            }
            videoElementRef.current.pause();
            videoElementRef.current.srcObject = null;
            await exitFullscreen();
          });

          session.addEventListener("streamsChanged", () => {
            console.log(`[GamePlayer] entering 'session streamsChanged' callback (session id: ${session._sessionId}`);
            if (videoElementRef.current) {
              const { streams } = session;
              if (streams.length > 0) {
                videoElementRef.current.srcObject = streams[0];
                videoElementRef.current.play().catch(error => {
                  console.error('[GamePlayer] error while playing video:', error);
                });
              }
            }
          });

          session.addEventListener("remoteControllerChanged", () => {
            console.log(`[GamePlayer] entering 'session remoteControllerChanged' callback (session id: ${session._sessionId}`);
            const { remoteController } = session;
            if (remoteController) {
              remoteController.attachVideoElement(videoElementRef.current);
            }
          });

          session.connect();

          hideCursor();
          setShowLoadingMsg(false);
        }
      },

      producerRemoved(producer: { id: string; }) {
        // TODO: this is never called, drop
        console.error(`[GamePlayer] producerRemoved callback (producer id: ${producer.id})`);
        //if (consumerSession) {
        //  consumerSession.close();
        // }
      },

      async sessionEnded(sid: string) {
        // called only when endSession query was explicitly called from our end
        // e.g. this will not be called when exiting through the native game menu
        console.log(`[GamePlayer] sessionEnded callback (session id: ${sid})`);
        if (activeSessionId.current === sid) {
          // an active session was explicitly requested to be closed (e.g. from the ExitGame dialog)
          // TODO: simply restoring cursor, button etc manully doesn't work so have to reload whole page
          window.location.reload();
        } else {
          if (nextGameReleaseUuid.current) {
            createSessionWrap(nextGameReleaseUuid.current);
          }
        }
      },
    };

    webRtcApi.current?.registerProducersListener(listener);
  }

  async function initWebRtcConn() {
    const signalingProtocol = window.location.protocol.startsWith("https") ? "wss" : "ws";
    const gstWebRTCConfig = {
      meta: { name: `YagGamePlayer-${Date.now()}` },
      signalingServerUrl: `${signalingProtocol}://${window.location.host}/webrtc`,
    };
    // GstWebRTCAPI ctor establishes ws connection;
    // none of HTTP errors (e.g. 401 unauthenticated) will be returned from ws connection:
    // https://stackoverflow.com/questions/21762596/how-to-read-status-code-from-rejected-websocket-opening-handshake-with-javascrip/50685387#50685387
    // so make sure user is authenticated beforehand
    webRtcApi.current = new GstWebRTCAPI(gstWebRTCConfig);
    // this will return only when connection was established
    return new Promise(async (resolve, reject) => {
      const listener = {
        async connected(clientId: string) {
          console.log("[GamePlayer] webRtcApi ws channel has been connected");
          initRemoteStreams();
          resolve(clientId);
        },
        disconnected() {
          console.log("[GamePlayer] webRtcApi ws channel has been disconnected");
        }
      };
      webRtcApi.current?.registerConnectionListener(listener);
    });
  }

  const playGame = async () => {
    // play game button click handler
    // check that user is authenticated to play
    // TODO: reuse userProfile from the switch.tsx (from some global state?)
    const userProfile = await getUserProfile();
    if (!userProfile) {
      setShowSignInDialog(true);
      return;
    }
    // initiate sigsvc connection (make sure user is authenticated at this point!)
    await initWebRtcConn();
    // check for pending/active/paused sessions (see sessionsList cb)
    webRtcApi.current?.getSessions();
  }

  const handlePlayButtonClick = async () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
    if (isSafariBrowser && gameDetails.app_reqs.ua.lock_pointer) {
      setShowSafariWarningDialog(true);
      return;
    }
    await playGame();
  }

  useEffect(() => {
    if (!Cookies.get('sigsvc_wsconnid')) {
      Cookies.set('sigsvc_wsconnid', crypto.randomUUID(), { expires: 7 })
    }
    nextUrl.current = `${window.location.href}?play=1`;

    // play immediately when explicitly requested
    const urlParams = new URLSearchParams(window.location.search);
    const play = urlParams.get('play');
    if (play === "1") {
      //TODO: fullscreen doesn't work with programmatic runs (permissions issue)
      //await playGame();
    }
  }, []);

  return (
    <div
      className="game_player_container"
      ref={gamePlayerContainerRef}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Ensure the container takes up full height
      }}
    >
      {showLoadingMsg && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 20,
          }}
        >
          <Typography variant='h2' style={{ color: 'white' }}>Loading, please wait...</Typography>
        </Box>
      )}
      {showPlayButton && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <Button
            variant='contained'
            startIcon={<PlayArrow />}
            onClick={handlePlayButtonClick}
          >
            PLAY GAME
          </Button>
        </Box>
      )}
      <video
        autoFocus
        ref={videoElementRef}
        style={{
          width: '100%',
          height: '100%',
          zIndex: -10,
        }}
      ></video>
      {showSignInDialog && nextUrl.current &&
        <SignInDialog
          onClose={() => {
            setShowSignInDialog(false);
          }}
          nextUrl={nextUrl.current}
        />}
      {showResumeGameDialog &&
        <ResumeGameDialog
          disablePortal={isFullScreen()} // otherwise dialog is not visible in the fullscreen mode
          orphanedGameDetails={orphanedGameDetails.current as GameReleaseDetailsProps}
          onResumeGame={function (): void {
            console.log("[GamePlayer] ResumeGameDialog: resume game");
            setShowResumeGameDialog(false);
            requestFullscreenWrap();
            restoreOrphanedSession();
          }}
          onCloseGame={function (): void {
            // close orphaned game session and run a new game
            console.log("[GamePlayer] ResumeGameDialog: close game");
            setShowResumeGameDialog(false);
            requestFullscreenWrap();
            endOrphanedSession(gameDetails.uuid);
          }} />}
      {showExitGameDialog &&
        <ExitGameDialog
          disablePortal={isFullScreen()} // otherwise dialog is not visible in the fullscreen mode
          onResumeGame={function (): void {
            // resume an active game
            console.log("[GamePlayer] ExitGameDialog: resume game session");
            setShowExitGameDialog(false);
            if (activeSessionId.current) {
              requestFullscreenWrap(false);
            } else {
              console.error("[GamePlayer] invalid state: no active session");
            }
          }}
          onCloseGame={function (): void {
            // close an active game
            console.log("[GamePlayer] ExitGameDialog: close game session");
            setShowExitGameDialog(false);
            if (activeSessionId.current) {
              endSessionWrap(activeSessionId.current);
            } else {
              console.error("[GamePlayer] invalid state: no active session");
            }
          }} />}
      
      {showSafariWarningDialog &&
        <SafariWarningDialog
          disablePortal={isFullScreen()} // otherwise dialog is not visible in the fullscreen mode
          onExit={function (): void {
            // exit game
            console.log("[GamePlayer] SafariWarningDialog: exit game");
            setShowSafariWarningDialog(false);
          }} />}
    </div>
  );
}
