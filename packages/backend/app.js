var express = require('express');
var app = express();
var router = express.Router();
var db = require('./db');

var swaggerUI = require('swagger-ui-express');
var YAML = require('yamljs');
var swaggerDocument = YAML.load('./swagger.yaml');

app.options('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, apikey');
    res.send(200);
})

var ContactController = require('./contact/ContactController');
app.use('/contacts', ContactController);

var HealthCheckController = require('./healthcheck/HealthCheckController');
app.use('/healthcheck', HealthCheckController);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1', router);

module.exports = app;