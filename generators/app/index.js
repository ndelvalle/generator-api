const path       = require('path');
const yosay      = require('yosay');
const generators = require('yeoman-generator');


const toCase = (str, strCase) => {
  str = str.replace(/[^\w\d_-]/, '');
  if (strCase === 'kebab-case') {
    return str
      .replace(/([\w\d])[_ ]([\w\d])/g, (_, m1, m2) => `${m1}-${m2}`)
      .replace(
        /([\w\d])?([A-Z])/g,
        (_, m1, m2) => m1 ? `${m1}-${m2.toLowerCase()}` : m2.toLowerCase()
      );
  }
  if (strCase === 'camelCase') {
    return str.replace(/([\w\d])[-_ ]([\w\d])/g, (_, m1, m2) => m1 + m2.toUpperCase());
  }
  if (strCase === 'ClassCase') {
    str = str.replace(/([\w\d])[-_ ]([\w\d])/g, (_, m1, m2) => m1 + m2.toUpperCase());
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
  throw new Error(`${strCase} is an invalid string case`);
};

const routerGen = (businessModels) => businessModels.map(bm => {
  const kebabCase = toCase(bm, 'kebab-case');
  return `router.route('/${kebabCase}')\n` +
         `  .get(controllers.${bm}.find.bind(controllers.${bm}))\n` +
         `  .post(controllers.${bm}.create.bind(controllers.${bm}));\n\n` +
         `router.route('/${kebabCase}/:id')\n` +
         `  .put(controllers.${bm}.update.bind(controllers.${bm}))\n` +
         `  .get(controllers.${bm}.findOne.bind(controllers.${bm}))\n` +
         `  .delete(controllers.${bm}.remove.bind(controllers.${bm}));\n`;
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
      // const done = this.async();
      return this.prompt([{
        name    : 'serverName',
        type    : 'input',
        message : 'Server name:',
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
        name    : 'businessModels',
        type    : 'input',
        message : 'Business models: (singular and comma separated)',
        default : 'user, pet'
      }, {
        name    : 'databaseName',
        type    : 'input',
        message : 'what should the database be named?',
        default : (answers) => toCase(answers.serverName, 'kebab-case')
      }]).then(answers => {
        this.serverName        = toCase(answers.serverName, 'kebab-case');
        this.serverDescription = answers.serverDescription;
        this.serverVersion     = answers.serverVersion;
        this.authorName        = answers.authorName;
        this.authorEmail       = answers.authorEmail;
        this.databaseName      = answers.databaseName;
        this.businessModels    = answers.businessModels
                                  .split(',')
                                  .map(bm => bm.trim())
                                  .map(bm => toCase(bm, 'camelCase'));
        this.routesImport      = routerGen(this.businessModels);
      });
    }
  },

  writing: {

    config() {
      this.fs.copyTpl(
        this.templatePath('config/config.js'),
        this.destinationPath('config/config.js'),
        {
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
        this.destinationPath('routes.js'),
        {
          serverName  : this.serverName,
          routesImport: this.routesImport
        }
      );
    },

    gitignore() {
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    eslintrc() {
      this.fs.copy(
        this.templatePath('.eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      );
    },

    eslintignore() {
      this.fs.copy(
        this.templatePath('.eslintignore'),
        this.destinationPath('.eslintignore')
      );
    },

    packageJSON() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
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

      this.businessModels.forEach(bm => {
        this.fs.copyTpl(
          this.templatePath('controllers/template.js'),
          this.destinationPath(`controllers/${bm}-controller.js`),
          {
            businessModel: toCase(bm, 'ClassCase'),
            modelPath    : bm
          }
        );
      });
    },

    models() {
      this.businessModels.forEach(bm => {
        this.fs.copyTpl(
          this.templatePath('models/template.js'),
          this.destinationPath(`models/${bm}-model.js`),
          {
            businessModel: toCase(bm, 'ClassCase'),
            schemaPath   : bm
          }
        );
      });
    },

    schemas() {
      this.businessModels.forEach(bm => {
        this.fs.copyTpl(
          this.templatePath('schemas/template.js'),
          this.destinationPath(`schemas/${bm}-schema.js`),
          {
            instanceName: toCase(bm, 'ClassCase')
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
