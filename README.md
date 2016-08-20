# generator-api

[![CircleCI](https://circleci.com/gh/ndelvalle/generator-api.svg?style=svg)](https://circleci.com/gh/ndelvalle/generator-api)
[![bitHound Overall Score](https://www.bithound.io/github/ndelvalle/generator-api/badges/score.svg)](https://www.bithound.io/github/ndelvalle/generator-api)
[![bitHound Dependencies](https://www.bithound.io/github/ndelvalle/generator-api/badges/dependencies.svg)](https://www.bithound.io/github/ndelvalle/generator-api/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/ndelvalle/generator-api/badges/devDependencies.svg)](https://www.bithound.io/github/ndelvalle/generator-api/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/ndelvalle/generator-api/badges/code.svg)](https://www.bithound.io/github/ndelvalle/generator-api)


Yeoman generator for creating RESTful NodeJS APIs, using ES6, Mongoose and Express. The fastest way to get your project up and running using an awesome stack.

![generator-angular-fullstack](http://yeoman.io/static/illustration-home-inverted.91b07808be.png)


## Getting started

- Make sure you have [yeoman](https://github.com/yeoman/yo) installed on your machine:
    `npm install -g yo`
- Install the generator **globally**: `npm install -g generator-api`
- Run: `yo api`, or `yo` and choose `Api` option

## Running the generated project
Make sure you have node version `>= 6.3` because this project uses es6 features without compiling with babel.

- Run: `mongod` to start the local mongodb instance. If you don't have mongodb installed locally, visit [their webpage](https://docs.mongodb.com/manual/installation/)
- Run: `npm run dev` to start the local server with nodemon at `localhost:8080`

## To do
* Add to README how is the project's architecture, and tips on how to scale from the generated project
* Give the generator more startup options
*  Create more generator templates to add new controllers / models / schemas once the project was initialized
* Implement testing in the generated project

## Contributing
Contributors are welcome, please fork and send pull requests! If you have any ideas on how to improve this project please submit an issue.


## License
[MIT License](https://github.com/ndelvalle/generator-api/blob/master/LICENSE)
