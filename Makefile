.PHONY: all

SHELL=/bin/bash -e

.DEFAULT_GOAL := help

-include .env

ENV ?= local

$(info ENV="$(ENV)")
$(info PREFIX="$(PREFIX)")

help: ## Справка
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

rebuild: ## Сборка контейнеров без запуска проекта
	docker compose -f docker/docker-compose.$(ENV).yml build

up: ## Запуск проекта
	docker compose -f docker/docker-compose.$(ENV).yml up -d

down: ## Остановка всех контейнеров проекта
	docker compose -f docker/docker-compose.$(ENV).yml down

rb-module4: ## Пересобрать контейнер module4
	@docker compose -f docker/docker-compose.$(ENV).yml up -d --build $(PREFIX)-module4
	@docker compose -f docker/docker-compose.$(ENV).yml down
	@docker compose -f docker/docker-compose.$(ENV).yml up -d

bash-module4: ## Зайти в bash контейнера с module4
	docker compose -f docker/docker-compose.$(ENV).yml exec $(PREFIX)-module4 /bin/bash
