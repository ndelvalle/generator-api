const Router = require('express').Router;
const router = new Router();

const user  = require('./model/user/user-router');
const pet  = require('./model/pet/pet-router');
/* yeoman require hook */
/* Don't remove this comment, it is needed by the sub generator */

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to example API!' });
});

router.use('/user', user);
router.use('/pet', pet);
/* yeoman use hook */
/* Don't remove this comment, it is needed by the sub generator' */

module.exports = router;
