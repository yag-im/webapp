This nginx proxy should be used only for local development.

It proxies all requests to other dependent services:

Nginx proxy (:8080)           /            webapp devcontainer (:8086)
                              /api         yagsvc devcontainer (:8082) 
                              /webrtc      sigsvc devcontainer (:8081)

Other devcontainers (for reference):

sessionsvc (:8084)
appsvc (:8085)
jukegoxsvc (:8083)

When developing locally without other services running locally, update APP_URL in 
/workspaces/webapp/src/common/common-utils.tsx.

Usage:

    make build
    make run
