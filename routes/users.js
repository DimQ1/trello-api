const express = require('express');

const router = express.Router();
const { role } = require('../services/authorize');
const { authorize } = require('../services/authorize');
const { usersController } = require('../controllers/index');

router.get('/', authorize.userRoleCheck(role.admin), usersController.getAll);
router.get('/:id', usersController.getById);
module.exports = router;
