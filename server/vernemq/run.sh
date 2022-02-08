# # -e "DOCKER_VERNEMQ_ALLOW_ANONYMOUS=on"
# start with winpty for windows
docker build -t vernemq:loc .
docker run \
  -it \
  --rm \
  -p 1883:1883 \
  -p 4369:4369 \
  -p 9090:8080 \
  -p 8883:8883 \
  -p 8888:8888 \
  -p 9100:9100 \
  -p 44053:44053 \
  vernemq:loc

# docker-compose up
