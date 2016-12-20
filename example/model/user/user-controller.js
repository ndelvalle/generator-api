const Controller = require('../../lib/controller');
const userFacade  = require('./user-facade');

class UserController extends Controller {}

module.exports = new UserController(userFacade);
