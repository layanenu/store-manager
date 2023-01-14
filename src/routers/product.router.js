const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.listAllProducts);
router.get('/:id', productController.getProductById);

module.exports = router;