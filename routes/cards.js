const express = require('express');

const router = express.Router();
const expressJoiValidator = require('express-joi-validator');
const { validators } = require('../businessLayer/cards');
const role = require('../helpers/role');
const authorize = require('../businessLayer/authorize');
const { cardsController } = require('../controllers/index');

router.post('/', expressJoiValidator(validators.create), authorize.userRoleCheck(role.admin), cardsController.create);
router.get('/', cardsController.findAll);
router.get('/:cardId', cardsController.findOne);
router.put('/', expressJoiValidator(validators.update), authorize.userRoleCheck(role.admin), cardsController.findByIdAndUpdate);
router.delete('/:cardId', authorize.userRoleCheck(role.admin), cardsController.deleteById);
module.exports = router;
