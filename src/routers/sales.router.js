const express = require('express');
const { salesController } = require('../controllers');
const validateProductId = require('../middlewares/validateProductId');
const validateQuantity = require('../middlewares/validateQuantity');

const router = express.Router();

router.post(
  '/',
  validateProductId,
  validateQuantity,
  salesController.insertSales,
);
router.get('/', salesController.listAllSales);
router.get('/:id', salesController.getSaleById);

module.exports = router;