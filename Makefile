install:
	npm ci

build:
	npm run build

bump:
	@read -p "Enter the version bump type (major, minor, patch): " version_bump; \
	./scripts/bump.sh $$version_bump

clean:
	rm -rf dist/ node_modules/ output/

prettier-check:
	npx prettier --check .

prettier-format:
	npx prettier --write .

package-extension:
	make clean
	make install
	make build
	mkdir -p output
	zip -r "output/$$(jq -r '.name' package.json)-$$(jq -r '.version' manifest.json).zip" dist/
