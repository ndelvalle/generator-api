const Controller = require('../../lib/controller');
const userFacade = require('./facade');

class UserController extends Controller {}

module.exports = new UserController(userFacade);
