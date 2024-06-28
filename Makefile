_ := $(shell mkdir -p .make)

.PHONY: preview diff up stack format install

preview: install
	pulumi preview

diff: install
	pulumi preview --diff

up: isntall
	pulumi up

stack: install
	pulumi stack select prod

format:
	dprint fmt

install: .make/yarn_install
.make/yarn_install: yarn.lock
	yarn install
	@touch $@
