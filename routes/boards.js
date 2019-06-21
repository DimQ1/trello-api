const express = require('express');

const router = express.Router();
const expressJoiValidator = require('express-joi-validator');
const { validators } = require('../services/boards');
const { role } = require('../services/authorize');
const { authorize } = require('../services/authorize');
const { boardsController } = require('../controllers/index');

router.post('/', authorize.userRoleCheck(role.admin), expressJoiValidator(validators.create), boardsController.create);
router.get('/', boardsController.getAll);
router.get('/:boardId', boardsController.findOne);
router.put('/', authorize.userRoleCheck(role.admin), expressJoiValidator(validators.update), boardsController.findByIdAndUpdate);
router.delete('/:boardId', authorize.userRoleCheck(role.admin), boardsController.deleteById);
module.exports = router;
