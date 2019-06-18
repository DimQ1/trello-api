const express = require('express');

const router = express.Router();
const BoardService = require('./BoardService.js');
const role = require('../helpers/role');
const Authorize = require('../helpers/Authorize');

const authorize = new Authorize();

const service = new BoardService();

async function create(req, res, next) {
    try {
        res.json(JSON.stringify(await service.create(req.body.board)));
    } catch (error) {
        next(error);
    }
}
function findAll(req, res, next) {
    try {
        res.json(service.findAll());
    } catch (error) {
        next(error);
    }
}
function findOne(req, res, next) {
    try {
        res.json(service.findOne(req.params.boardId));
    } catch (error) {
        next(error);
    }
}

async function findByIdAndUpdate(req, res, next) {
    try {
        res.json({ updated: await service.findByIdAndUpdate(req.body.board) });
    } catch (error) {
        next(error);
    }
}

async function deleteById(req, res, next) {
    try {
        res.json({ deleted: await service.deleteById(req.params.boardId) });
    } catch (error) {
        next(error);
    }
}

// Create a new board
router.post('/', authorize.userRoleCheck(role.admin), create);

// Retrieve all boards
router.get('/', findAll);

// Retrieve a single board with boardId
router.get('/:boardId', findOne);

// Update a board with boardId
router.put('/', authorize.userRoleCheck(role.admin), findByIdAndUpdate);

// Delete a board with boardId
router.delete('/:boardId', authorize.userRoleCheck(role.admin), deleteById);
module.exports = router;
