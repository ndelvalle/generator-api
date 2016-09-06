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
        models           : ['foo', 'bar', 'BazFoo'],
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

    it('generates a config.js file', () => {
      assert.file(['config.js']);
    });

    describe('models', () => {
      it('generates a folder for each model', () => {
        assert.file([
          'model/foo',
          'model/bar',
          'model/baz-foo'
        ]);
      });

      describe('controllers', () => {
        it('generates a controller for each model', () => {
          assert.file([
            'model/foo/foo-controller.js',
            'model/bar/bar-controller.js',
            'model/baz-foo/baz-foo-controller.js'
          ]);
        });
      });

      describe('facades', () => {
        it('generates a facade for each model', () => {
          assert.file([
            'model/foo/foo-facade.js',
            'model/bar/bar-facade.js',
            'model/baz-foo/baz-foo-facade.js'
          ]);
        });
      });

      describe('routes', () => {
        it('generates a router for each model', () => {
          assert.file([
            'model/foo/foo-router.js',
            'model/bar/bar-router.js',
            'model/baz-foo/baz-foo-router.js'
          ]);
        });
      });

      describe('schemas', () => {
        it('generates a schema for each model', () => {
          assert.file([
            'model/foo/foo-schema.js',
            'model/bar/bar-schema.js',
            'model/baz-foo/baz-foo-schema.js'
          ]);
        });
      });
    });

    describe('libs', () => {
      it('generates a lib/controller.js file', () => {
        assert.file(['lib/controller.js']);
      });

      it('generates a lib/facade.js file', () => {
        assert.file(['lib/facade.js']);
      });
    });
  });
});
