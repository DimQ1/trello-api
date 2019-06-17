const express = require('express');

const router = express.Router();
const CardService = require('./CardService');
const role = require('../helpers/role');
const Authorize = require('../helpers/Authorize');

const authorize = new Authorize();

const service = new CardService();

async function create(req, res, next) {
    res.send(JSON.stringify(await service.create(req.body.card)));
}
function findAll(req, res, next) {
    res.send(service.findAll());
}
function findOne(req, res, next) {
    res.send(service.findOne(req.params.cardId));
}

async function findByIdAndUpdate(req, res, next) {
    res.send({ updated: await service.findByIdAndUpdate(req.body.card) });
}

async function deleteById(req, res, next) {
    res.send({ deleted: await service.deleteById(req.params.cardId) });
}

// Create a new board
router.post('/', authorize.userRoleCheck(role.admin), create);

// Retrieve all boards
router.get('/', findAll);

// Retrieve a single board with boardId
router.get('/:cardId', findOne);

// Update a board with boardId
router.put('/', authorize.userRoleCheck(role.admin), findByIdAndUpdate);

// Delete a board with boardId
router.delete('/:cardId', authorize.userRoleCheck(role.admin), deleteById);
module.exports = router;
