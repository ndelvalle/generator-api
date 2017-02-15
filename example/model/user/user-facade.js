const Model = require('../../lib/facade');
const userSchema  = require('./user-schema');

class UserModel extends Model {}

module.exports = new UserModel(userSchema);
