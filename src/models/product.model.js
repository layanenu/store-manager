const camelize = require('camelize');
const connection = require('./db/connection');

const listAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
    return camelize(result);
};

const getProductById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(product);
};

const insertProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );
  return { id: insertId, name };
};

const updateProductById = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id, name };
};

module.exports = {
  listAllProducts,
  getProductById,
  insertProduct,
  updateProductById,
};