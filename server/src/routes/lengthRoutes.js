const express = require('express')
const {convert} = require('../controllers/lengthController.js')

const router = express.Router();

router.post('/convert', convert);

module.exports = router;
