docker run -d --name postgresql -e ALLOW_EMPTY_PASSWORD=yes --net phppgadmin-tier -v ${PWD}/db_volume:/bitnami --rm bitnami/postgresql:latest
docker run -d --name phppgadmin -p 8081:8080 -p 5432:8443 --net phppgadmin-tier --rm bitnami/phppgadmin:latest