docker build -t shadrqen/ep-ds-migrator:1.0.1 .
docker run -it --network host -v ${PWD}:/app --rm shadrqen/ep-ds-migrator:1.0.1
