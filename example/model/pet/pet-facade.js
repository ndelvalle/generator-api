const Model = require('../../lib/facade');
const petSchema  = require('./pet-schema');

class PetModel extends Model {}

module.exports = new PetModel(petSchema);
