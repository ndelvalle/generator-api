const Controller = require('../libraries/controller');
const <%= businessModel %>Model  = require('../models/<%= modelPath %>-model');

// HTTP layer, in this instance you can manage express request, response and next.
// In libraries/controller you have the basic RESTful methods find, findOne, findById,
// create, update and remove. Because this class is extending from there, you got that solved.
// You can overwrite extended methods or create custom ones here.

class <%= businessModel %>Controller extends Controller {

	// Example of overwriting update method using findOneAndUpdate from mongoose

	// update(req, res, next) {
	// 	this.model.findOneAndUpdate({ _id: req.params.id }, req.body)
	// 	.then(doc => {
	// 		if (!doc) res.status(404).send();
	// 		return res.status(200).json(doc);
	// 	})
	// 	.catch(err => next(err));
	// }

	// Example of a custom method. Remember that you can use this method
	// in a specific route in the router file

	// customMethod(req, res, next) {
	// 	this.model.geoNear([1,3], { maxDistance : 5, spherical : true })
	// 	.then(doc => {
	// 		if (!doc) res.status(404).send();
	// 		return res.status(200).json(doc);
	// 	})
	// 	.catch(err => next(err));
	// }
}

module.exports = new <%= businessModel %>Controller(<%= businessModel %>Model);
