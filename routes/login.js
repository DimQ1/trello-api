const express = require('express');

const router = express.Router();
const { loginController } = require('../controllers/index');

router.post('/', loginController.authenticate);
module.exports = router;
