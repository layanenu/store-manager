const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertSales = async (req, res) => {
  const newSale = req.body;
  const { type, message } = await salesService.insertSales(newSale);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

const listAllSales = async (req, res) => {
  const { type, message } = await salesService.listAllSales();
  if (type) return res.status(errorMap.mapError(type)).json(message);
  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  insertSales,
  listAllSales,
  getSaleById,
};
