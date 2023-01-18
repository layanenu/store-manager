const validateQuantity = (req, res, next) => {
  const newSales = req.body;

  const findQuantity = (reqSale) =>
    reqSale.every((element) => element.quantity);
  
  const valueQuantity = (reqSale) =>
    reqSale.every((element) => element.quantity === 0 || element.quantity < 0);
  
  if (valueQuantity(newSales)) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (!findQuantity(newSales)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
    return next();
};

module.exports = validateQuantity;