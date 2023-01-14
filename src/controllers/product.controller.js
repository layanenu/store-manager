const productService = require('../services/product.service');
// const errorMap = require('../utils/errorMap');

const listAllProducts = async (_req, res) => {
  const products = await productService.listAllProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message, data } = await productService.getProductById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(data);
};

module.exports = {
  listAllProducts,
  getProductById,
};