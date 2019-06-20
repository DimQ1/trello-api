const express = require('express');

const router = express.Router();
const expressJoiValidator = require('express-joi-validator');
const { validators } = require('../businessLayer/boards');
const role = require('../helpers/role');
const authorize = require('../businessLayer/authorize');
const { boardsController } = require('../controllers/index');

router.post('/', authorize.userRoleCheck(role.admin), expressJoiValidator(validators.create), boardsController.create);
router.get('/', boardsController.getAll);
router.get('/:boardId', boardsController.findOne);
router.put('/', authorize.userRoleCheck(role.admin), expressJoiValidator(validators.update), boardsController.findByIdAndUpdate);
router.delete('/:boardId', authorize.userRoleCheck(role.admin), boardsController.deleteById);
module.exports = router;
