const { salesModel, productModel, salesProduct } = require('../models');
// const schema = require('./validations/validationsInputValues');

// const listAllSales = async () => {
//   const products = await productModel.listAllProducts();
//   return { type: null, message: products };
// };

// const getSaleById = async (productId) => {
//   const error = schema.validateId(productId);
//   if (error.type) return error;

//   const product = await productModel.getProductById(productId);
//   if (!product) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }
//   return { type: null, message: product };
// };

const existId = async (newSales) => {
  const findId = await Promise.all(newSales.map(async (element) => {
    const idProduct = await productModel.getProductById(element.productId);
    if (!idProduct) return false;
    return true;
  }));
    return findId;
};

const insertSales = async (newSales) => {
  // const error = schema.validateNewSales(sales);
  // if (error.type) return error;
  await salesModel.insertSales();
  const productId = await existId(newSales);
  const ifIdExist = productId.every((element) => element === true);
  if (ifIdExist) {
    const result = await salesProduct.insertSalesProduct(newSales);
    if (result) return { type: null, message: result };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  insertSales,
};
