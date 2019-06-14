const express = require('express');

const router = express.Router();
const BoardService = require('./BoardService.js');
const role = require('../helpers/role');
const Authorize = require('../helpers/Authorize');

const authorize = new Authorize();

const service = new BoardService();

function create(req, res, next) {
    service.create(req.params.board);
}
function findAll(req, res, next) {
    res.send(service.findAll());
}
function findOne(req, res, next) {
    res.send(service.findOne(req.params.boardId));
}

function findByIdAndUpdate(req, res, next) {
    service.findByIdAndUpdate(req.body);
}

function deleteById(req, res, next) {
    res.send(service.deleteById(req.params.boardId));
}

// Create a new board
router.post('/', authorize.userRoleCheck(role.admin), create);

// Retrieve all boards
router.get('/', findAll);

// Retrieve a single board with boardId
router.get('/:boardId', findOne);

// Update a board with boardId
router.put('/:boardId', authorize.userRoleCheck(role.admin), findByIdAndUpdate);

// Delete a board with boardId
router.delete('/:boardId', authorize.userRoleCheck(role.admin), deleteById);
module.exports = router;
