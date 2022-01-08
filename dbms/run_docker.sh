docker build -t server-db .
docker run -it --network host -v ${PWD}:/app --rm server-db
