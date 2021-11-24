var express = require('express');
var router = express.Router();

const saleController = require('../controllers/sales/salesController');

router.put('/save',saleController.saveSale);
// router.put('/update/:id',productController.updateProduct);
// router.delete('/delete/:id',productController.deleteProduct);

module.exports = router;