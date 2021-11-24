var express = require('express');
var router = express.Router();

const productController = require('../controllers/products/productsController');

router.put('/save',productController.createProduct);
router.put('/update/:id',productController.updateProduct);
router.delete('/delete/:id',productController.deleteProduct);

module.exports = router;