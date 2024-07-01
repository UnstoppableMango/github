_ := $(shell mkdir -p .make)

.PHONY: preview diff up stack lint format install

preview: install
	pulumi preview

diff: install
	pulumi preview --diff

up: install
	pulumi up

stack: install
	pulumi stack select prod

lint: install
	yarn eslint .

format:
	dprint fmt

install: .make/yarn_install
.make/yarn_install: yarn.lock
	yarn install
	@touch $@
