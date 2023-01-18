const validateProductId = (req, res, next) => {
  const newSales = req.body;
  const findId = (reqSale) => reqSale.every((element) => element.productId);
  if (!findId(newSales)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();
};

module.exports = validateProductId;
