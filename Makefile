start:
	heroku local -f Procfile.dev

start-backend:
	node server.js	

start-frontend:
	yarn start --hot

install:
	yarn install

build:
	rm -rf build

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku

fix:
	eslint --fix .

.PHONY: test
