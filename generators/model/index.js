const Generator = require('yeoman-generator')
const to = require('to-case')

const genModelNames = model => ({
  slugName: to.slug(model),
  pascalName: to.pascal(model),
  camelName: to.camel(model)
})

const modelGenerator = class extends Generator {
  prompting () {
    return this.prompt([{
      name: 'models',
      type: 'input',
      message: 'Models: (singular and comma separated)',
      filter: answer => answer.split(','),
      default: 'newModel'
    }]).then((answers) => {
      this.models = answers.models.map(genModelNames)
    })
  }

  writing () {
    this.models.forEach((model) => {
      const controllerPath = `model/${model.slugName}/controller.js`
      const facadePath = `model/${model.slugName}/facade.js`
      const routerPath = `model/${model.slugName}/router.js`
      const schemaPath = `model/${model.slugName}/schema.js`

      if (
        this.fs.exists(this.destinationPath(controllerPath)) ||
        this.fs.exists(this.destinationPath(facadePath)) ||
        this.fs.exists(this.destinationPath(routerPath)) ||
        this.fs.exists(this.destinationPath(schemaPath))
      ) {
        this.log(`Model ${model.slugName} already exists`)
        return
      }
      if (this.fs.exists(this.destinationPath('routes.js'))) {
        let routes = this.fs.read(this.destinationPath('routes.js'))
        routes = routes.split('\n')
        const routerPathmini = routerPath.slice(0, -3)
        let lineindex = routes.findIndex(line => line.includes('router.use'))
        routes.splice(3, 0, `const ${model.slugName} = require('./${routerPathmini}')`)
        if (lineindex === -1) {
          lineindex = 11
        }
        routes.splice(lineindex, 0, `router.use('/${model.slugName}', ${model.slugName})`)
        routes = routes.join('\n')
        this.fs.write(this.destinationPath('routes.js'), routes)
      }
      this.fs.copyTpl(
        this.templatePath('./../../app/templates/model/controller.js'),
        this.destinationPath(`model/${model.slugName}/controller.js`), {
          model
        }
      )

      this.fs.copyTpl(
        this.templatePath('./../../app/templates/model/facade.js'),
        this.destinationPath(facadePath), {
          model
        }
      )

      this.fs.copyTpl(
        this.templatePath('./../../app/templates/model/router.js'),
        this.destinationPath(routerPath), {
          model
        }
      )

      this.fs.copyTpl(
        this.templatePath('./../../app/templates/model/schema.js'),
        this.destinationPath(schemaPath), {
          model
        }
      )
    })
  }
}

module.exports = modelGenerator
