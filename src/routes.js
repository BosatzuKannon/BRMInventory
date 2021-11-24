const express = require('express')
const router = express.Router()
const passport = require('passport')

const all_Route = require('./routes/mainRoute');

router.use('/bmr',all_Route)

module.exports = router
