.PHONY: preview up

preview:
	pulumi -C src preview

diff:
	pulumi -C src preview --diff

up:
	pulumi -C src up

format:
	dprint fmt
