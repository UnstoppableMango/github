.PHONY: preview diff up

preview:
	pulumi preview

diff:
	pulumi preview --diff

up:
	pulumi up

stack:
	pulumi stack select prod

format:
	dprint fmt
