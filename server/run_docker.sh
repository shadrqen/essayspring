docker build -t server-web .
docker run -it --network host -v ${PWD}:/app --rm server-web
