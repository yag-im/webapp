# WebRTC Web App

Implements the front-end interface for end-users.

## Development

### Prerequisite

Create *webapp/proxy/.env* file:

    SERVER_NAME=localhost
    WEBAPP_URL=http://webapp.yag.dc:8086
    WEBAPI_URL=http://webapi.yag.dc:8082

and run a proxy server:

    cd webapp/proxy
    make build
    make run

The following devcontainers should be up and running:

    webapi

Then simply open this project in any IDE that supports devcontainers (VSCode is recommended).

### Notes

session == WebRtcSession (webrtc-session.js) == ConsumerSession (extends WebRTCSession) (consumer-session.js)

#### webrtc-session.js

Added sessionId into ctor of WebRTCSession. sessionId is defined by sigsvc.

Describes a direct WebRTC connection between consumer (UA) and producer (streamd).

Has internal _rtcPeerConnection with peer (for what?)

close():
    - sends endSession to sigsvc
    - sends stateChanged, rtcPeerConnectionChanged, closed events to UA

#### consumer-sesison.js

Implements WebRTCSession.

connect():
    - sends startSession to sigsvc
    - sends stateChanged to UA

