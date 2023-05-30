install:
	npm ci

build:
	npm run build

clean:
	rm -rf dist/ .parcel-cache/ node_modules/

prettier-check:
	npx prettier --check .

prettier-format:
	npx prettier --write .

package-extension:
	mkdir -p output
	make clean
	make install
	make build
	zip -r "output/$$(jq -r '.name' package.json)-$$(jq -r '.version' manifest.json).zip" dist/
