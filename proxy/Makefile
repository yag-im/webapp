ROOT_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))
SHELL := /bin/bash

APP_NAME := yag-webapp-proxy
DOCKER_IMAGE_TAG := $(APP_NAME):dev
LISTEN_PORT := 8080

.PHONY: help
help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: run
run: ## Run docker image
	docker run --rm \
		--name $(APP_NAME) \
		-p $(LISTEN_PORT):80/tcp \
		--add-host=webapp.yag.dc:172.17.0.1 \
		--add-host=yagsvc.yag.dc:172.17.0.1 \
		--add-host=sigsvc.yag.dc:172.17.0.1 \
		--env-file .env \
		$(DOCKER_IMAGE_TAG)

.PHONY: build
build: ## Build docker image
	docker build \
		-t $(DOCKER_IMAGE_TAG) \
		--progress plain \
		.
