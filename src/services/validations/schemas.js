const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameProductSchema = Joi.string().min(5).required();

// const oneSaleSchema = Joi.object({
//   productId: idSchema,
//   quantity: Joi.number().integer().min(1).required(),
// });

// const salesSchema = Joi.array().items(oneSaleSchema);

module.exports = {
  idSchema,
  nameProductSchema,
  // salesSchema,
};
