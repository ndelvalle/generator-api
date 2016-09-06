const path       = require('path');
const yosay      = require('yosay');
const to         = require('to-case');
const generators = require('yeoman-generator');


const genModelNames = (model) => {
  const modelNames = {
    slugName  : to.slug(model),
    pascalName: to.pascal(model),
    camelName : to.camel(model)
  };
  return modelNames;
};

const serverGenerator = generators.Base.extend({
  prompting: {
    welcome() {
      this.log(yosay(
        '\'Allo \'allo! Out of the box I include Express and Mongoose, as well as a' +
        'few other goodies, to build your rest api Server.'
      ));
    },

    ask() {
      return this.prompt([{
        name    : 'serverName',
        type    : 'input',
        message : 'Server name:',
        filter  : (answer) => to.slug(answer),
        default : path.basename(this.destinationPath())
      }, {
        name    : 'serverDescription',
        type    : 'input',
        message : 'Server description:'
      }, {
        name    : 'serverVersion',
        type    : 'input',
        message : 'Server version:',
        default : '0.1.0'
      }, {
        name    : 'authorName',
        type    : 'input',
        message : 'Author name:',
        store   : true
      }, {
        name    : 'authorEmail',
        type    : 'input',
        message : 'Author email:',
        store   : true
      }, {
        name    : 'models',
        type    : 'input',
        message : 'Models: (singular and comma separated)',
        filter  : (answer) => answer.split(','),
        default : 'user, pet'
      }, {
        name    : 'databaseName',
        type    : 'input',
        message : 'what should the database be named?',
        default : (answers) => to.slug(answers.serverName)
      }]).then(answers => {
        this.serverName        = answers.serverName;
        this.serverDescription = answers.serverDescription;
        this.serverVersion     = answers.serverVersion;
        this.authorName        = answers.authorName;
        this.authorEmail       = answers.authorEmail;
        this.databaseName      = answers.databaseName;
        this.models            = answers.models.map(genModelNames);
      });
    }
  },

  writing: {
    config() {
      this.fs.copyTpl(
        this.templatePath('config.js'),
        this.destinationPath('config.js'), {
          serverName   : this.serverName,
          databaseName : this.databaseName
        }
      );
    },

    index() {
      this.fs.copy(
        this.templatePath('index.js'),
        this.destinationPath('index.js')
      );
    },

    routes() {
      this.fs.copyTpl(
        this.templatePath('routes.js'),
        this.destinationPath('routes.js'), {
          serverName: this.serverName,
          models    : this.models
        }
      );
    },

    gitignore() {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    eslintrc() {
      this.fs.copy(
        this.templatePath('eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      );
    },

    eslintignore() {
      this.fs.copy(
        this.templatePath('eslintignore'),
        this.destinationPath('.eslintignore')
      );
    },

    packageJSON() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'), {
          serverName       : this.serverName,
          serverDescription: this.serverDescription,
          serverVersion    : this.serverVersion,
          authorName       : this.authorName,
          authorEmail      : this.authorEmail
        }
      );
    },

    controller() {
      this.fs.copy(
        this.templatePath('lib/controller.js'),
        this.destinationPath('lib/controller.js')
      );
    },

    facade() {
      this.fs.copy(
        this.templatePath('lib/facade.js'),
        this.destinationPath('lib/facade.js')
      );
    },

    model() {
      this.models.forEach(model => {
        this.fs.copyTpl(
          this.templatePath('model/controller.js'),
          this.destinationPath(`model/${model.slugName}/${model.slugName}-controller.js`), {
            model
          }
        );

        this.fs.copyTpl(
          this.templatePath('model/facade.js'),
          this.destinationPath(`model/${model.slugName}/${model.slugName}-facade.js`), {
            model
          }
        );

        this.fs.copyTpl(
          this.templatePath('model/router.js'),
          this.destinationPath(`model/${model.slugName}/${model.slugName}-router.js`), {
            model
          }
        );

        this.fs.copyTpl(
          this.templatePath('model/schema.js'),
          this.destinationPath(`model/${model.slugName}/${model.slugName}-schema.js`), {
            model
          }
        );
      });
    }
  },

  install() {
    this.npmInstall();
  }
});


module.exports = serverGenerator;
