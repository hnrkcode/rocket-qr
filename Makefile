.PHONY: build install bump clean zip

install:
	npm install

build:
	npm run build

bump:
	@read -p "Enter the version bump type (major, minor, patch): " version_bump; \
	./scripts/bump.sh $$version_bump

clean:
	rm -rf build/ node_modules/ chrome-extension/ .svelte-kit/

zip:
	make clean
	make install
	make build
	mkdir -p chrome-extension
	zip -r "chrome-extension/$$(jq -r '.name' package.json)-$$(jq -r '.version' ./static/manifest.json).zip" build
