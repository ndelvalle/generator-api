# example-api

[![generator-api](https://img.shields.io/badge/built%20with-generator--api-green.svg)](https://github.com/ndelvalle/generator-api)

Example API





## dependencies

[Docker](https://docs.docker.com/engine/installation/) :whale: & [docker-compose](https://docs.docker.com/compose/install/).

## developing

run locally run using docker-compose:

```bash
sudo docker-compose up
```

the app runs on `localhost:8080`

## production

build the Docker :whale: container and run it:

_you'll likely be consuming mongodb as a service, so make sure you set the env var to connect to it._

```bash
sudo docker build -t <image-name> .
sudo docker run \
  -p <host-port>:8080 \
  -d <image-name> \
  -e MONGO_DB_URI=mongodb://<username>:<password>@<host>:<port> \
  npm run start
```



--------------------------------------------------------------------------------
