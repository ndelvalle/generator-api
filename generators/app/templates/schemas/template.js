const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const <%= instanceName %>Schema = new Schema({
  title: { type: String, required: true },
  body:  { type: String }
});


module.exports = mongoose.model('<%= instanceName %>', <%= instanceName %>Schema);
