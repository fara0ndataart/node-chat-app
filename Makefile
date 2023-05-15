build:
	docker build -t node-express-app .
run:
	docker run -p 8082:8082 node-express-app
down:
	docker stop node-express-app
ps:
	docker ps
