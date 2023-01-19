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

const listAllSales = async () => {
  const [result] = await connection.execute(`SELECT s.date as date, sp.sale_id as saleId, 
  sp.product_id as productId,
  sp.quantity as quantity FROM sales AS s INNER JOIN sales_products AS sp 
  ON s.id = sp.sale_id ORDER BY sale_id,product_id`);
  return result;
};

const getSaleById = async (id) => {
     const [result] = await connection.execute(
       `SELECT ts.date, tsp.product_id as productId, tsp.quantity
    FROM sales AS ts
    INNER JOIN sales_products AS tsp
    ON ts.id = tsp.sale_id
    WHERE ts.id = ?
    ORDER BY tsp.product_id`,
       [id],
     );
    return result;
};

module.exports = {
  insertSalesProduct,
  listAllSales,
  getSaleById,
};