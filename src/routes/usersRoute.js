var express = require('express');
var router = express.Router();

const userController = require('../controllers/users/usersController');

router.put('/',userController.createUser);

module.exports = router;