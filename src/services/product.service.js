const productModel = require('../models/product.model');
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

  const newProductId = await productModel.insertProduct({ name });
  const newProduct = await productModel.getProductById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  listAllProducts,
  getProductById,
  insertProduct,
};