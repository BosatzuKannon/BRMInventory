var express = require('express');
var router = express.Router();

const reportController = require('../controllers/reports/reportsController');

router.get('/sales/:id',reportController.getSales);

module.exports = router;