# api-server-boilerplate

A stripped down generic API boilerplate built around NodeJS and Swagger V3.

[![Greenkeeper badge](https://badges.greenkeeper.io/davesag/api-server-boilerplate.svg)](https://greenkeeper.io/)

## Branches

<!-- prettier-ignore -->
| Branch | Tests | Code Coverage | Comments |
| ------ | ----- | ------------- | -------- |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/api-server-boilerplate/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/api-server-boilerplate/tree/develop) | [![codecov](https://codecov.io/gh/davesag/api-server-boilerplate/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/api-server-boilerplate) | Work in progress |
| `master`  | [![CircleCI](https://circleci.com/gh/davesag/api-server-boilerplate/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/api-server-boilerplate/tree/master) | [![codecov](https://codecov.io/gh/davesag/api-server-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/api-server-boilerplate) | Latest Production Release |

## Configuration

Set the following environment variables

| Variable | Default | Notes                          |
| -------- | ------- | ------------------------------ |
| `PORT`   | `8282`  | The port the server listens on |

## API Routes

If it's running locally (see below) point a browser at any of the following routes:

- [localhost:8282](http://127.0.0.1:8282)
- [localhost:8282/ping](http://127.0.0.1:8282/ping)
- [localhost:8282/api/v1/hello/some name](http://127.0.0.1:8282/api/v1/hello/some%20name)

and see the API docs at

- [localhost:8282/docs](http://127.0.0.1:8282/docs)

## What's the point of this?

I write a lot of APIs and have distilled my current best-practice into this codebase to save myself time, and as example code for other developers wondering how to do this sort of stuff.

## What do you do with it?

Just clone it or fork it, nuke the existing `.git` data and replace with your own `git init` and `git flow init` edit the `README.md` file, add your own details to `api.yml` and add routes to `src/api/` as you like.

## What's included?

- a couple of root-level API routes and simple controllers

  - `src/api/ping`
  - `src/api/versions`

- a versioned API route and controller

  - `src/api/v1/hello`

- automatic linking of swagger paths to controllers using [`swagger-routes-express`](https://github.com/davesag/swagger-routes-express) and [`traverse-folders`](https://github.com/davesag/traverse-folders)
- automatic generation of API docs using [`swagger-ui-express`](https://github.com/scottie1984/swagger-ui-express)
- simple logging (swap out the code in `src/utils/logger` to add your own)
- standardised [`node-http-error`](https://github.com/carsondarling/node-http-error) and [`http-status-codes`](https://github.com/prettymuchbryce/http-status-codes) and simple `generic` and `notFound` error handlers
- the swagger editor as an easy to invoke docker image
- [`dotenv`](https://github.com/motdotla/dotenv) support

### Code quality

- unit testing using

  - [`mocha`](https://mochajs.org),
  - [`sinon`](https://sinonjs.org),
  - [`chai`](https://www.chaijs.com), and
  - [`proxyquire`](https://github.com/thlorenz/proxyquire)

- `request` and `response` mocks using [`mock-req-res`](https://github.com/davesag/mock-req-res)
- 100% unit test coverage using [`nyc`](https://github.com/istanbuljs/nyc)
- integration testing using [`supertest`](https://github.com/visionmedia/supertest)
- code quality using [`eslint`](https://eslint.org) and [`prettier`](https://prettier.io)
- mutation testing with [`stryker-mutator`](https://stryker-mutator.io)
- [`circleci`](https://circleci.com) integration
- [`greenkeeper`](https://greenkeeper.io) integration

## What's not included?

I've paired this right back to the simplest, most generic API I could, so there's no

- authentication (add `passport` and update `src/utils/makeApp` and add appropriate security blocks to `api.yml`)
- example of an asynchronous route via [`route-async`](https://github.com/davesag/route-async)
- rate limiting
- middleware (roll your own and update `src/utils/makeApp`)
- monitoring
- sockets or event listeners
- databases, search systems, etc

## Development

### Prerequisites

- [NodeJS](htps://nodejs.org), version 10.15.3 (LTS) or better. (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)
- [Docker](https://www.docker.com) if you want to use the Swagger Editor. (Use [Docker for Mac](https://docs.docker.com/docker-for-mac/), not the `homebrew` version)

### To build and run locally

Clone this (or better yet, fork it then clone your fork)

```sh
npm install
npm start
```

You can then go to [localhost:8282/docs](http://127.0.0.1:8282/docs) to see the docs.

### `.env` file

You can put environment variables in a `.env` file.

### Development Helpers

| Service        | Port   | Command           | Notes              |
| -------------- | ------ | ----------------- | ------------------ |
| Swagger Editor | `8080` | `npm run swagger` | The swagger editor |

Copy and paste the `api.yml` file into the editor to edit it.

### Testing

- `npm test` to run the unit tests
- `npm run test:server` will run the integration tests
- `npm run lint` will lint it
- `npm run prettier` will prettify it
- `npm run test:unit:cov` will run the unit tests with code coverage
- `npm run test:mutants` will run the unit tests with mutation testing

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
