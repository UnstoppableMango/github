_ := $(shell mkdir -p .make)
WORKING_DIR := $(shell pwd)

PULUMI := ${WORKING_DIR}/bin/pulumi

.PHONY: preview diff up stack lint format install

preview: install stack | bin/pulumi
	$(PULUMI) preview

diff: install stack | bin/pulumi
	$(PULUMI) preview --diff

up: install stack | bin/pulumi
	$(PULUMI) up

install: .make/yarn_install
stack: .make/stack_select_prod

lint: install
	yarn eslint .

format: .make/format

bin/pulumi: .versions/pulumi
	curl -fsSL https://get.pulumi.com | sh -s -- --install-root ${WORKING_DIR} --version $(shell cat $<) --no-edit-path

.envrc: hack/example.envrc
	cp $< $@

.make/yarn_install: yarn.lock | bin/pulumi
	$(PULUMI) install
	@touch $@

.make/stack_select_prod: | bin/pulumi
	$(PULUMI) stack select prod
	@touch $@

.make/format: $(shell find . -name '*.ts' -not -path '**/node_modules/**')
	dprint fmt $?
	@touch $@
