var express = require('express');
var app = express();
var router = express.Router();
var db = require('./db');

var swaggerUI = require('swagger-ui-express');
var YAML = require('yamljs');
var swaggerDocument = YAML.load('./swagger.yaml');

var ContactController = require('./contact/ContactController');
app.use('/contacts', ContactController);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1', router);

module.exports = app;