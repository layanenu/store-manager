const productModel = require('../models/product.model');

const listAllProducts = async () => {
  const products = await productModel.listAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) return { type: 404, message: 'Product not found' };
  return { type: null, data: product };
};

module.exports = {
  listAllProducts,
  getProductById,
};