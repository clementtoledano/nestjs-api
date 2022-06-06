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

# run remove all table
$ npm run schema:drop

# run seeds
$ npm run seed:run
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
https://github.com/maciejcieslar/nest-unit-tests/tree/master/src/app/playlist
https://github.com/TusharRoy23/todoAppOnNestJs
https://github.com/mwanago/nestjs-typescript/tree/master/src/users/tests
