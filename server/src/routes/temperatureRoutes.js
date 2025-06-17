const express = require('express')
const {convert} = require('../controllers/temperatureController.js')

const router = express.Router();

router.post('/convert', convert);

module.exports = router;
