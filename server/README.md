<h3 align="center">
  <br>
  <a href="https://essayspring.com" target="_blank"><img src="https://raw.githubusercontent.com/shadrqen/essayspring/main/client/static/icon.png" height="256px" width="256px"></a>
  <br>
  EssaySpring Serverside
  <br>
</h3>

### Dev Setup

#### install dependencies
```
npm install

# in case you encounter errors installing dependencies

npm install --legacy-peer-deps
```

#### run redis
```
# get into the redis directory

cd redis

# run redis

./runredis.sh
```

#### create vernemq database

```
# first ensure that the database (under DBMS) is running

# then create database vernemq
```

#### populate vernemq tables

```

cd vernemq

# import the postgres.sql
 
# use it to create tables under the vernemq database
```

#### start vernemq (MQTT-broker)
```
# make sure you are at the vernemq directory

# edit vernemq.conf line 1494

vmq_diversity.postgres.host = [YOUR_LOCAL_IP_ADDRESS]

# run vernemq

./run.sh
```

#### create and update .env file
```
# make sure you are at the serverside root directory

# create a .env file at the project root directory

# copy values from sample_env to the new .env file

# replace the placeholders with real values
```

#### serve with hot reload at [YOUR_IP_ADDRESS]:3100
```
# make sure you are at the serverside root directory

- ./start_dev.sh # or
- nodemon bin/www
```
