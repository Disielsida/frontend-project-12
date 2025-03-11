lint-frontend:
	make -C frontend lint

install:
	npm ci
	make -C frontend install

start-frontend:
	make -C frontend start

start:
	npx start-server -s ./frontend/dist

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/dist
	make -C frontend build