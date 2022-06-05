## Installation

```bash
$ npm install
```

## Running the app with docker-compose

```bash
# development
$ docker-compose up --build
```

## Running Typeorm cli

```bash

# enter in the contenair

docker exec -it 1001ref-api  /bin/sh
# or
docker exec -it 1001ref-api  //bin//sh

# create migration
$ npm run migration:create <migration name>

# generate migration
$ npm run migration:generate <migration name>

# run migration
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

https://github.com/ThomasOliver545/real-time-chat-nestjs-angular
