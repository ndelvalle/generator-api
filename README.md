# generator-api

[![Codeship Status for ndelvalle/generator-api](https://app.codeship.com/projects/2078d9b0-07a0-0136-24ea-22486c3356cd/status?branch=master)](https://app.codeship.com/projects/281027)
[![bitHound Overall Score](https://www.bithound.io/github/ndelvalle/generator-api/badges/score.svg)](https://www.bithound.io/github/ndelvalle/generator-api)
[![bitHound Dependencies](https://www.bithound.io/github/ndelvalle/generator-api/badges/dependencies.svg)](https://www.bithound.io/github/ndelvalle/generator-api/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/ndelvalle/generator-api/badges/devDependencies.svg)](https://www.bithound.io/github/ndelvalle/generator-api/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/ndelvalle/generator-api/badges/code.svg)](https://www.bithound.io/github/ndelvalle/generator-api)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c4ef0a3c22c940469bb69af91a44f386)](https://www.codacy.com/app/ndelvalle/generator-api?utm_source=github.com&utm_medium=referral&utm_content=ndelvalle/generator-api&utm_campaign=badger)
[![npm](https://img.shields.io/npm/v/generator-api.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/generator-api)

[![NPM](https://nodei.co/npm/generator-api.png?downloads=true)](https://nodei.co/npm/generator-api/)

Yeoman generator for creating RESTful NodeJS APIs, using ES6, Mongoose and Express. The fastest way to get your project up and running using an awesome stack.

![generator](http://yeoman.io/static/illustration-home-inverted.91b07808be.png)


## Getting started

- Make sure you have [yeoman](https://github.com/yeoman/yo) installed on your machine:
    `npm install -g yo`
- Install the generator **globally**: `npm install -g generator-api`
- Run: `yo api`, or `yo` and choose `Api` option

## Running the generated project

Make sure you have node version `>= 6` because this project uses native supported ES6 features.

### Development

- Run: `mongod` to start the local mongodb in a separated terminal instance (If you don't have mongodb installed locally, visit It's [webpage](https://docs.mongodb.com/manual/installation/) to learn how to install it).
- Run: `npm run dev` to run the app (By default the app will run at `localhost:8080`, you can change this in the config file).

**Did you choose Docker (:whale:) support?**

You only need [Docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/) installed, forget about having node, mongodb or npm.

- Run: `docker-compose up` to run the app. _You might need `sudo` for this one_.

_NOTE_: The Dockerfile uses `node:latest` as its starting point, if you wish to use another version of Node check out the available ones [here](https://hub.docker.com/_/node/).

### Production

You'll likely be consuming mongodb as a service, so make sure to set the env var pointing at it. Then run `npm start`.

**Using Docker**

Build the Docker container and run it:

```bash
sudo docker build -t <image-name> .
sudo docker run \
  -p <host-port>:8080 \
  -d <image-name> \
  -e MONGO_DB_URI=mongodb://<username>:<password>@<host>:<port> \
  npm run start
```

## Architecture
Assuming we use `user` and `pet` models the generated project will look like this:

```
├───index.js
├───routes.js
├───package.json
├───config.js
└───lib/
|   ├───controller.js
|   ├───facade.js
└───model/
    ├───user/
    │   └───controller.js
    |   └───facade.js
    |   └───router.js
    |   └───schema.js
    └───pet/
        └───controller.js
        └───facade.js
        └───router.js
        └───schema.js
```

#### Controller:
HTTP layer, in this instance you can manage express request, response and next. In `lib/controller` are the basic RESTful methods `find`, `findOne`, `findById`, `create`, `update` and `remove`. Because this class is extending from there, you got that solved. You can overwrite extended methods or create custom ones here.

#### Facade:
This layer works as a simplified interface of mongoose and as business model layer, in this instance you can manage your business logic.
Here are some use case examples:
* Validate collection `x` before creating collection `y`
* Create collection `x` before creating collection `y`

In `lib/facade` you have the basic support for RESTful methods. Because this class is extending from there, you got that solved. You can overwrite extended methods or create custom ones here. Also you can support more mongoose functionality like `skip`, `sort` etc.

## Model subgenerator

Once you have the generated project, if you want to add a new model you can simply run `yo api:model`. This will generate a new folder under `model`, in order to make it work, you just need to import the route into the `routes.js`.

Example:

* Run `yo api:model`, write foo (What ever model name you want)
* Go to `routes.js` and import the new generated model route `const foo = require('./model/foo/router')`
* Use the imported route `router.use('/foo', foo)`

## Contributing
Contributors are welcome, please fork and send pull requests! If you find a bug or have any ideas on how to improve this project please submit an issue.


## License
[MIT License](https://github.com/ndelvalle/generator-api/blob/master/LICENSE)

## Style guide
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
