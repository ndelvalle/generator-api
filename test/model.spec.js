/* global describe before it */

const helpers = require('yeoman-test');
const assert  = require('yeoman-assert');
const path    = require('path');

describe('generator-api:model', () => {

  describe('Run yeoman model sub generator', () => {
    before(() => helpers.run(path.join(__dirname, '../generators/model'))
      .withPrompts({
        models: ['newmodel1', 'newmodel2']
      })
      .toPromise());

    describe('models', () => {
      it('generates a folder for each model', () => {
        assert.file([
          'model/newmodel1',
          'model/newmodel2'
        ]);
      });

      describe('controllers', () => {
        it('generates a controller for each model', () => {
          assert.file([
            'model/newmodel1/newmodel1-controller.js',
            'model/newmodel2/newmodel2-controller.js'
          ]);
        });
      });

      describe('facades', () => {
        it('generates a facade for each model', () => {
          assert.file([
            'model/newmodel1/newmodel1-facade.js',
            'model/newmodel2/newmodel2-facade.js'
          ]);
        });
      });

      describe('routes', () => {
        it('generates a router for each model', () => {
          assert.file([
            'model/newmodel1/newmodel1-router.js',
            'model/newmodel2/newmodel2-router.js'
          ]);
        });
      });

      describe('schemas', () => {
        it('generates a schema for each model', () => {
          assert.file([
            'model/newmodel1/newmodel1-schema.js',
            'model/newmodel2/newmodel2-schema.js'
          ]);
        });
      });
    });
  });
});
