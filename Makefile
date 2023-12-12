build:
	cd api && $(MAKE) build
	cd client && $(MAKE) build
	cd admin && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down