const path = require('path')
const yosay = require('yosay')
const to = require('to-case')
const Generator = require('yeoman-generator')

const genModelNames = model => ({
  slugName: to.slug(model),
  pascalName: to.pascal(model),
  camelName: to.camel(model)
})

const serverGenerator = class extends Generator {
  prompting () {
    this.log(yosay('\'Allo \'allo! Out of the box I include Express and Mongoose, as well as a' +
                     'few other goodies, to build your rest api Server.'))

    return this.prompt([{
      name: 'serverName',
      type: 'input',
      message: 'Server name:',
      filter: answer => to.slug(answer),
      default: path.basename(this.destinationPath())
    }, {
      name: 'serverDescription',
      type: 'input',
      message: 'Server description:'
    }, {
      name: 'serverVersion',
      type: 'input',
      message: 'Server version:',
      default: '0.1.0'
    }, {
      name: 'authorName',
      type: 'input',
      message: 'Author name:',
      store: true
    }, {
      name: 'authorEmail',
      type: 'input',
      message: 'Author email:',
      store: true
    }, {
      name: 'models',
      type: 'input',
      message: 'Models: (singular and comma separated)',
      filter: answer => answer.split(','),
      default: 'user, pet'
    }, {
      name: 'databaseName',
      type: 'input',
      message: 'what should the database be named?',
      default: answers => to.slug(answers.serverName)
    }, {
      name: 'useDocker',
      type: 'confirm',
      message: 'would you like to have Docker included in the app?',
      default: true
    }]).then((answers) => {
      this.serverName = answers.serverName
      this.serverDescription = answers.serverDescription
      this.serverVersion = answers.serverVersion
      this.authorName = answers.authorName
      this.authorEmail = answers.authorEmail
      this.databaseName = answers.databaseName
      this.models = answers.models.map(genModelNames)
      this.useDocker = answers.useDocker
    })
  }

  writing () {
    // Config
    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath('config.js'), {
        serverName: this.serverName,
        databaseName: this.databaseName
      }
    )

    // Index
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    )

    // Routes
    this.fs.copyTpl(
      this.templatePath('routes.js'),
      this.destinationPath('routes.js'), {
        serverName: this.serverName,
        models: this.models
      }
    )

    // Gitignore
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    )

    // Eslintrc
    this.fs.copy(
      this.templatePath('eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    )

    // Eslintignore
    this.fs.copy(
      this.templatePath('eslintignore'),
      this.destinationPath('.eslintignore')
    )

    // Package
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        serverName: this.serverName,
        serverDescription: this.serverDescription,
        serverVersion: this.serverVersion,
        authorName: this.authorName,
        authorEmail: this.authorEmail
      }
    )

    // Controller
    this.fs.copy(
      this.templatePath('lib/controller.js'),
      this.destinationPath('lib/controller.js')
    )

    // Facade
    this.fs.copy(
      this.templatePath('lib/facade.js'),
      this.destinationPath('lib/facade.js')
    )

    // Model
    this.models.forEach((model) => {
      this.fs.copyTpl(
        this.templatePath('model/controller.js'),
        this.destinationPath(`model/${model.slugName}/controller.js`), {
          model
        }
      )

      this.fs.copyTpl(
        this.templatePath('model/facade.js'),
        this.destinationPath(`model/${model.slugName}/facade.js`), {
          model
        }
      )

      this.fs.copyTpl(
        this.templatePath('model/router.js'),
        this.destinationPath(`model/${model.slugName}/router.js`), {
          model
        }
      )

      this.fs.copyTpl(
        this.templatePath('model/schema.js'),
        this.destinationPath(`model/${model.slugName}/schema.js`), {
          model
        }
      )
    })

    // Dockerfile
    if (this.useDocker) {
      this.fs.copy(
        this.templatePath('Dockerfile'),
        this.destinationPath('Dockerfile')
      )
    }

    // Docker-compose
    if (this.useDocker) {
      this.fs.copyTpl(
        this.templatePath('docker-compose.yml'),
        this.destinationPath('docker-compose.yml'), {
          databaseName: this.databaseName
        }
      )
    }

    // Readme
    this.fs.copyTpl(
      this.templatePath('README.template.md'),
      this.destinationPath('README.md'), {
        useDocker: this.useDocker,
        serverName: this.serverName,
        serverDescription: this.serverDescription
      }
    )
  }

  install () {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: true
    })
  }
}

module.exports = serverGenerator
