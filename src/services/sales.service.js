const { salesModel, productModel, salesProduct } = require('../models');
const schema = require('./validations/validationsInputValues');

const existId = async (newSales) => {
  const findId = await Promise.all(newSales.map(async (element) => {
    const idProduct = await productModel.getProductById(element.productId);
    if (!idProduct) return false;
    return true;
  }));
    return findId;
};

const insertSales = async (newSales) => {
  await salesModel.insertSales();
  const productId = await existId(newSales);
  const ifIdExist = productId.every((element) => element === true);
  if (ifIdExist) {
    const result = await salesProduct.insertSalesProduct(newSales);
    if (result) return { type: null, message: result };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const listAllSales = async () => {
  const sales = await salesProduct.listAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await salesProduct.getSaleById(saleId);

  if (!sale || sale.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

module.exports = {
  insertSales,
  listAllSales,
  getSaleById,
};
