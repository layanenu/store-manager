const express = require('express');
const { productController } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewproduct');

const router = express.Router();

router.get('/', productController.listAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateNewProduct, productController.insertProduct);

module.exports = router;