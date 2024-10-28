# WebRtc

session == WebRtcSession (webrtc-session.js) == ConsumerSession (extends WebRTCSession) (consumer-session.js)

## webrtc-session.js

Added sessionId into ctor of WebRTCSession. sessionId is defined by sigsvc.

Describes a direct WebRTC connection between consumer (UA) and producer (streamd).

Has internal _rtcPeerConnection with peer (for what?)

close():
    - sends endSession to sigsvc
    - sends stateChanged, rtcPeerConnectionChanged, closed events to UA

## consumer-sesison.js

Implements WebRTCSession.

connect():
    - sends startSession to sigsvc
    - sends stateChanged to UA

