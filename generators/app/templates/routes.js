const controllers = require('./controllers');

const Router = require('express').Router;
const router = new Router();


router.get('/', (req, res) => {
  res.json({ message: 'Welcome to <%= serverName %> API!' });
});

<%- routesImport %>

module.exports = router;
