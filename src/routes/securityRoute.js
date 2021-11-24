var express = require('express');
var router = express.Router();

const securityController = require('../controllers/users/securityController');

router.post('/signin', securityController.login);

module.exports = router;