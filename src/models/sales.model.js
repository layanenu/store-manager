const connection = require('./db/connection');

// const listAllSales = async () => {
//   const [result] = await connection.execute(
//     'SELECT * FROM StoreManager.products',
//   );
//   return camelize(result);
// };

// const getSaleById = async (productId) => {
//   const [[product]] = await connection.execute(
//     'SELECT * FROM StoreManager.products WHERE id = ?',
//     [productId],
//   );
//   return camelize(product);
// };

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

module.exports = {
  insertSales,
};
