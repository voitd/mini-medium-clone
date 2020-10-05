install:
	install-deps

start:
	heroku local -f Procfile.dev

start-frontend:
	yarn start --hot

install-deps:
	npm install

build:
	rm -rf dist

test:
	npm test -s

test-coverage:
	npm test -- --coverage

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku

fix:
	eslint --fix .

.PHONY: test
