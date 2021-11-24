var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


const routes = require('./src/routes')

var app = express();
app.use(cors());
app.use(logger('common'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(fileUpload());

// Passport middlewares
require('./src/controllers/commons/auth/auth')

app.all(['/','/ping','/Control','/index'], (req, res) => {
    res.status(200).json({
      name: 'N-Control',
      provider: 'cobrando.com.co',
      version: 'v1'
    })
})

app.use('/',routes)

module.exports = app;
