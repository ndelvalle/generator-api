/* eslint-disable max-len */
/* global describe before it */

const helpers       = require('yeoman-test');
const assert        = require('yeoman-assert');
const path          = require('path');
const includedFiles = require('./included-files-cases');

describe('generator-api', () => {
  describe('Run yeoman generator-api with no docker support', () => {

    before(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        serverName       : 'serverName',
        serverDescription: 'serverDescription',
        serverVersion    : 'serverVersion',
        authorName       : 'authorName',
        authorEmail      : 'authorEmail',
        models           : ['foo', 'bar', 'BazFoo'],
        databaseName     : 'databaseName',
        useDocker        : false
      })
      .toPromise());


    includedFiles.forEach((fileCase) => {
      it(fileCase.desc, () => {
        assert.file(fileCase.files);
      });
    });

    const notIncludedFiles = [{
      desc : 'doest not generate docker files when useDocker = false',
      files: ['Dockerfile', 'docker-compose.yml']
    }];

    notIncludedFiles.forEach((fileCase) => {
      it(fileCase.desc, () => {
        assert.noFile(fileCase.files);
      });
    });

    it('generated README.md does not include references to docker', () => {
      assert.noFileContent('README.md', /Docker/);
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

  describe('Run yeoman generator-api with docker support', () => {

    before(() => helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        serverName       : 'serverName',
        serverDescription: 'serverDescription',
        serverVersion    : 'serverVersion',
        authorName       : 'authorName',
        authorEmail      : 'authorEmail',
        models           : ['foo'],
        databaseName     : 'databaseName',
        useDocker        : true
      })
      .toPromise());

    it('generates docker files when useDocker = true', () => {
      assert.file('Dockerfile', 'docker-compose.yml');
    });

    it('generated README.md does include references to docker', () => {
      assert.fileContent('README.md', /Docker/);
    });
  });
});
