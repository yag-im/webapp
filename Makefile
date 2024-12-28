ROOT_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))
SHELL := /bin/bash

APP_NAME := webapp
DOCKER_IMAGE_TAG := $(APP_NAME):dev
LISTEN_PORT := 80

.PHONY: help
help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: install
install: ## Install app dependencies
	npm install

.PHONY: build
build: ## Build app package
	npm run build

.PHONY: lint
lint: ## Run linters
	npm run lint:check

.PHONY: test
test: ## Run unit tests
	npm run test

.PHONY: clean
clean: ## Remove all generated artifacts (except .venv and .env)
	rm -rf .next
	rm -rf node_modules

.PHONY: docker-run
docker-run: ## Run dev docker image
	docker run --rm -it \
		--name yag-$(APP_NAME) \
		-p $(LISTEN_PORT):$(LISTEN_PORT)/tcp \
		--add-host host.docker.internal:host-gateway \
		--env-file $(ROOT_DIR)/.devcontainer/.env \
		--env-file $(ROOT_DIR)/.devcontainer/secret.env \
		$(DOCKER_IMAGE_TAG)

.PHONY: docker-build
docker-build: ## Build docker image
	docker build \
		-t $(DOCKER_IMAGE_TAG) \
		--progress plain \
		.
