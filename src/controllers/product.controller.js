const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const listAllProducts = async (_req, res) => {
  const { type, message } = await productService.listAllProducts();
  if (type) return res.status(errorMap.mapError(type)).json(message);
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.insertProduct(name);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message); // 201 indica que a solicitação foi bem-sucedida e levou à criação de um recurso.
};

module.exports = {
  listAllProducts,
  getProductById,
  insertProduct,
};
