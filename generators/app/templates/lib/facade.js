const mongoose = require('mongoose');

class Facade {
  constructor(name, schema) {
    this.model = mongoose.model(name, schema);
  }

  create(body) {
    const model = new this.model(body);
    return model.save();
  }

  find(...args) {
    return this.model
      .find(...args)
      .exec();
  }

  findOne(...args) {
    return this.model
      .findOne(...args)
      .exec();
  }

  findById(...args) {
    return this.model
      .findById(...args)
      .exec();
  }

  update(...args) {
    return this.model
      .update(...args)
      .exec();
  }

  remove(...args) {
    return this.model
      .remove(...args)
      .exec();
  }
}

module.exports = Facade;
