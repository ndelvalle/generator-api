const to         = require('to-case');
const generators = require('yeoman-generator');
const fileReader = require('html-wiring');

const genModelNames = (model) => {
  const modelNames = {
    slugName  : to.slug(model),
    pascalName: to.pascal(model),
    camelName : to.camel(model)
  };
  return modelNames;
};

const updateRoutesFile = (model, file) => {
  const useHook       = '/* yeoman use hook */';
  const requireHook   = '/* yeoman require hook */';
  const insertUse     = `router.use('/${model.slugName}', ${model.camelName});`;
  const insertRequire = `const ${model.camelName} = require('./model/${model.slugName}/${model.slugName}-router');`;

  if (file.indexOf(insertRequire) === -1) {
    file = file.replace(requireHook, `${insertRequire} \n ${requireHook}`);
  }

  if (file.indexOf(insertUse) === -1) {
    file = file.replace(useHook, `${insertUse} \n ${useHook}`);
  }

  return file;
};


const serverGenerator = generators.Base.extend({
  prompting: {
    ask() {
      return this.prompt([{
        name   : 'models',
        type   : 'input',
        message: 'Models: (singular and comma separated)',
        filter : answer => answer.split(','),
        default: 'newModel'
      }]).then((answers) => {
        this.models = answers.models.map(genModelNames);
      });
    }
  },

  writing: {
    model() {
      const path = this.destinationPath('routes.js');
      let file   = fileReader.readFileAsString(path);

      this.models.forEach((model) => {

        if (this.fs.exists(this.destinationPath(`model/${model.slugName}/${model.slugName}-controller.js`))) {
          this.log(`Model ${model.slugName} already exists`);
        } else {
          // All good
          this.fs.copyTpl(
            this.templatePath('./../../app/templates/model/controller.js'),
            this.destinationPath(`model/${model.slugName}/${model.slugName}-controller.js`), {
              model
            }
          );

          this.fs.copyTpl(
            this.templatePath('./../../app/templates/model/facade.js'),
            this.destinationPath(`model/${model.slugName}/${model.slugName}-facade.js`), {
              model
            }
          );

          this.fs.copyTpl(
            this.templatePath('./../../app/templates/model/router.js'),
            this.destinationPath(`model/${model.slugName}/${model.slugName}-router.js`), {
              model
            }
          );

          this.fs.copyTpl(
            this.templatePath('./../../app/templates/model/schema.js'),
            this.destinationPath(`model/${model.slugName}/${model.slugName}-schema.js`), {
              model
            }
          );

          file = updateRoutesFile(model, file);
        }
      });

      this.fs.write(path, file);
    }
  }
});

module.exports = serverGenerator;
