const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertSales = async (req, res) => {
  const newSale = req.body;
  const { type, message } = await salesService.insertSales(newSale);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  insertSales,
};