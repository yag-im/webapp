#!/usr/bin/env bash

mkdir -p /workspaces/webapp/.vscode
cp /workspaces/webapp/.devcontainer/vscode/* /workspaces/webapp/.vscode

make install
