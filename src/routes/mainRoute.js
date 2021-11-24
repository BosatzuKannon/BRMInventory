const express = require('express');
const router = express.Router();

const userRoute = require('./usersRoute')
const productRoute = require('./productsRoute')
const saleRoute = require('./salesRoute')
const reportRoute = require('./reportsRoute')

router.use('/user',userRoute)
router.use('/product',productRoute)
router.use('/sale',saleRoute)
router.use('/report',reportRoute)

module.exports = router;