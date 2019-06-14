const express = require('express');

const router = express.Router();
const role = require('../helpers/role');
const userService = require('./service');
const Authorize = require('../helpers/Authorize');
const authenticate = require('../helpers/authenticate');

const authorize = new Authorize();

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

// routes
// public route
router.post('/authenticate', authenticate);
// admin only
router.get('/', authorize.userRoleCheck(role.admin), getAll);
// all authenticated users
router.get('/:id', getById);
module.exports = router;
