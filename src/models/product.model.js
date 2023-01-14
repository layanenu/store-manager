const connection = require('./db/connection');

const listAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  // console.log(result);
  return result;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
);
  return product;
};

module.exports = {
  listAllProducts,
  getProductById,
};
