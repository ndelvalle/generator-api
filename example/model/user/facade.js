const Facade = require('../../lib/facade');
const userSchema = require('./schema');

class UserFacade extends Facade {}

module.exports = new UserFacade('User', userSchema);
