const express = require('express')
const {convert} = require('../controllers/weightController.js')

const router = express.Router();

router.post('/convert', convert);

module.exports = router;