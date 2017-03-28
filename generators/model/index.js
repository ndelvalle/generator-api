const Generator = require('yeoman-generator');
const to        = require('to-case');


const genModelNames = model => ({
  slugName  : to.slug(model),
  pascalName: to.pascal(model),
  camelName : to.camel(model)
});

const serverGenerator = Generator.extend({
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
      this.models.forEach((model) => {

        const controllerPath = `model/${model.slugName}/controller.js`;
        const facadePath     = `model/${model.slugName}/facade.js`;
        const routerPath     = `model/${model.slugName}/router.js`;
        const schemaPath     = `model/${model.slugName}/schema.js`;

        if (
          this.fs.exists(this.destinationPath(controllerPath)) ||
          this.fs.exists(this.destinationPath(facadePath))     ||
          this.fs.exists(this.destinationPath(routerPath))     ||
          this.fs.exists(this.destinationPath(schemaPath))
        ) {
          this.log(`Model ${model.slugName} already exists`);
          return;
        }

        this.fs.copyTpl(
          this.templatePath('./../../app/templates/model/controller.js'),
          this.destinationPath(`model/${model.slugName}/controller.js`), {
            model
          }
        );

        this.fs.copyTpl(
          this.templatePath('./../../app/templates/model/facade.js'),
          this.destinationPath(facadePath), {
            model
          }
        );

        this.fs.copyTpl(
          this.templatePath('./../../app/templates/model/router.js'),
          this.destinationPath(routerPath), {
            model
          }
        );

        this.fs.copyTpl(
          this.templatePath('./../../app/templates/model/schema.js'),
          this.destinationPath(schemaPath), {
            model
          }
        );
      });
    }
  }
});

module.exports = serverGenerator;
