.PHONY: preview up

preview:
	pulumi -C src preview

up:
	pulumi -C src up

format:
	dprint fmt
