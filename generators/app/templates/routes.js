const Router = require('express').Router
const router = new Router()

<%_ models.forEach(function(model){ _%>
const <%= model.camelName %> = require('./model/<%= model.slugName %>/router')
<%_ }) _%>

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to <%= serverName %> API!' })
})

<%_ models.forEach(function(model){ _%>
router.use('/<%= model.slugName %>', <%= model.camelName %>)
<%_ }) _%>

module.exports = router
