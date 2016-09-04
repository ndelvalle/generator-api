const path       = require('path');
const yosay      = require('yosay');
const to         = require('to-case');
const generators = require('yeoman-generator');


const routerGen = (models) => models.map(bm => {
  const slug = to.slug(bm);
  return `router.route('/${slug}')\n` +
    `  .get((...args) => controllers.${bm}.find(...args))\n` +
    `  .post((...args) => controllers.${bm}.create(...args));\n\n` +
    `router.route('/${slug}/:id')\n` +
    `  .put((...args) => controllers.${bm}.update(...args))\n` +
    `  .get((...args) => controllers.${bm}.findById(...args))\n` +
    `  .delete((...args) => controllers.${bm}.remove(...args));\n`;
}).join('\n\n');

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
        filter  : (answer) => answer.split(' ').map(m => to.camel(m.trim())),
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
        this.models            = answers.models;
        this.routesImport      = routerGen(this.models);
      });
    }
  },

  writing: {
    config() {
      this.fs.copyTpl(
        this.templatePath('config/config.js'),
        this.destinationPath('config/config.js'), {
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
          serverName  : this.serverName,
          routesImport: this.routesImport
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
        this.templatePath('libraries/controller.js'),
        this.destinationPath('libraries/controller.js')
      );
    },

    model() {
      this.fs.copy(
        this.templatePath('libraries/model.js'),
        this.destinationPath('libraries/model.js')
      );
    },

    promisifyAll() {
      this.fs.copy(
        this.templatePath('libraries/promisify-all.js'),
        this.destinationPath('libraries/promisify-all.js')
      );
    },

    requireAll() {
      this.fs.copy(
        this.templatePath('libraries/require-all.js'),
        this.destinationPath('libraries/require-all.js')
      );
    },

    controllers() {
      this.fs.copy(
        this.templatePath('controllers/index.js'),
        this.destinationPath('controllers/index.js')
      );

      this.models.forEach(bm => {
        this.fs.copyTpl(
          this.templatePath('controllers/template.js'),
          this.destinationPath(`controllers/${bm}-controller.js`), {
            businessModel: to.pascal(bm),
            modelPath    : bm
          }
        );
      });
    },

    models() {
      this.models.forEach(bm => {
        this.fs.copyTpl(
          this.templatePath('models/template.js'),
          this.destinationPath(`models/${bm}-model.js`), {
            businessModel: to.pascal(bm),
            schemaPath   : bm
          }
        );
      });
    },

    schemas() {
      this.models.forEach(bm => {
        this.fs.copyTpl(
          this.templatePath('schemas/template.js'),
          this.destinationPath(`schemas/${bm}-schema.js`), {
            instanceName: to.pascal(bm)
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
