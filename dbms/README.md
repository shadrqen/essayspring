<h3 align="center">
  <br>
  <a href="https://essayspring.com" target="_blank"><img src="https://raw.githubusercontent.com/shadrqen/essayspring/main/clientside/static/icon.png" height="256px" width="256px"></a>
  <br>
  EssaySpring DBMS
  <br>
</h3>

### Dev Setup

#### install dependencies
```
npm install

# in case you encounter errors installing dependencies

npm install --legacy-peer-deps
```

#### run the database
```
# get into the database directory

cd database
```

#### start the docker database instance
```
./run_docker_db.sh
```

#### cd back to the dbms root
```
cd ..
```

#### then create the schemas and tables
```
./create_schemas.sh
```

#### next do the migrations
```
./migratedb.sh
```

#### then populate the database
```
./dbseed.sh
```

#### serve with hot reload at localhost:3050
```
- ./start_dev.sh # or
- nodemon bin/www
```
