SERVER_DIR = app/server
SERVER_DIST = $(SERVER_DIR)/dist
CLIENT_DIR = app/client
CLIENT_DIST = $(CLIENT_DIR)/dist

CLIENT_DIST = app/client/dist
TSC = $(BIN)/tsc
TSC_CONFIG = tsconfig.json
TSLINT = $(BIN)/tslint
TS_SRC = $(shell find Server -type f -name "*.ts")

.PHONY: server-test
server-test:
	cd app/server && npm run test

.PHONY: server-dev-build
server-dev-build:
	rm -rf $(SERVER_DIST)/*
	cd app/server && npm install && npm run webpack

.PHONY: server-clean
server-clean:
	rm -rf $(SERVER_DIST)/*

.PHONY: run-fullstack
run-fullstack:
	docker-compose up

