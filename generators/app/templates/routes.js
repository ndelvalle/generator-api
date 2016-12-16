const Router = require('express').Router;
const router = new Router();

<%_ models.forEach(function(model){ _%>
const <%= model.camelName %>  = require('./model/<%= model.slugName %>/<%= model.slugName %>-router');
<%_ }); _%>
/* yeoman require hook */
/* Don't remove this comment, it is needed by the sub generator */

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to <%= serverName %> API!' });
});

<%_ models.forEach(function(model){ _%>
router.use('/<%= model.slugName %>', <%= model.camelName %>);
<%_ }); _%>
/* yeoman use hook */
/* Don't remove this comment, it is needed by the sub generator' */

module.exports = router;
