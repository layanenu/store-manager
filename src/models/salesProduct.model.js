const connection = require('./db/connection');

const insertSalesProduct = async (sale) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES( ?, ?, ? )';
  const secondQuery = 'SELECT * FROM StoreManager.sales_products ORDER BY sale_id DESC LIMIT 1';

  const [[result]] = await connection.execute(secondQuery);
  const id = result.sale_id + 1;

  const sales = await Promise.all(sale.map(async (element) => {
    await connection.execute(query, [id, element.productId, element.quantity]);
    return element;
  }));
  return { id, itemsSold: sales };
};

module.exports = {
  insertSalesProduct,
};