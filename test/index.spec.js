/* eslint-disable max-len */
/* global describe before it */

const helpers = require('yeoman-test');
const assert  = require('yeoman-assert');
const path    = require('path');

describe('generator-api', () => {
  describe('Run yeoman generator-api', () => {

    before(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        serverName       : 'serverName',
        serverDescription: 'serverDescription',
        serverVersion    : 'serverVersion',
        authorName       : 'authorName',
        authorEmail      : 'authorEmail',
        businessModels   : 'foo, bar',
        databaseName     : 'databaseName'
      })
      .toPromise());

    it('generates an index.js file', () => {
      assert.file(['index.js']);
    });

    it('generates a router.js file', () => {
      assert.file(['routes.js']);
    });

    it('generates a package.json file', () => {
      assert.file(['package.json']);
    });

    it('generates a .eslintignore file', () => {
      assert.file(['.eslintignore']);
    });

    it('generates a .eslintrc.json file', () => {
      assert.file(['.eslintrc.json']);
    });

    it('generates a .gitignore file', () => {
      assert.file(['.gitignore']);
    });

    describe('config', () => {
      it('generates a config/config.js file', () => {
        assert.file(['config/config.js']);
      });
    });

    describe('controllers', () => {
      it('generates an controllers/index.js file', () => {
        assert.file(['controllers/index.js']);
      });

      it('generates a controllers/foo-controller.js file', () => {
        assert.file(['controllers/foo-controller.js']);
      });

      it('generates a controllers/bar-controller.js file', () => {
        assert.file(['controllers/bar-controller.js']);
      });
    });

    describe('libraries', () => {
      it('generates a libraries/controller.js file', () => {
        assert.file(['libraries/controller.js']);
      });

      it('generates a libraries/model.js file', () => {
        assert.file(['libraries/model.js']);
      });

      it('generates a libraries/promisify-all.js file', () => {
        assert.file(['libraries/promisify-all.js']);
      });

      it('generates a libraries/require-all.js file', () => {
        assert.file(['libraries/require-all.js']);
      });
    });

    describe('models', () => {
      it('generates a models/foo-model.js file', () => {
        assert.file(['models/foo-model.js']);
      });

      it('generates a models/bar-model.js file', () => {
        assert.file(['models/bar-model.js']);
      });
    });

    describe('schemas', () => {
      it('generates a schemas/foo-schema.js file', () => {
        assert.file(['schemas/foo-schema.js']);
      });

      it('generates a schemas/bar-schema.js file', () => {
        assert.file(['schemas/bar-schema.js']);
      });
    });

  });
});
