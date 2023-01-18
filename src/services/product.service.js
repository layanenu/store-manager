const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const listAllProducts = async () => {
  const products = await productModel.listAllProducts();
  return { type: null, message: products };
};

const getProductById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;
  
  const product = await productModel.getProductById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const insertProduct = async (name) => {
  const error = schema.validateName(name);
  if (error.type) return error;
  const product = await productModel.insertProduct(name);
  return { type: null, message: product };
};

module.exports = {
  listAllProducts,
  getProductById,
  insertProduct,
};