FROM mcr.microsoft.com/devcontainers/javascript-node:20-bookworm

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
      iputils-ping \
      vim
