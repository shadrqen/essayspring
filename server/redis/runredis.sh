docker pull redis
docker run --rm -it --name ws-redis-server --volume "${PWD}"/vol:/data --publish 6379:6379 redis --appendonly yes
