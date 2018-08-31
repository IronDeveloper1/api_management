var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// GET - Returns a 200 OK
router.get('/', (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;