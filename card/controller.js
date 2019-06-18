const express = require('express');

const router = express.Router();
const expressJoiValidator = require('express-joi-validator');

const CardService = require('./CardService');
const role = require('../helpers/role');
const Authorize = require('../helpers/Authorize');
const validators = require('./validators');

const authorize = new Authorize();

const service = new CardService();

async function create(req, res, next) {
    try {
        res.json(await service.create(req.body.card));
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
        res.json(service.findOne(req.params.cardId));
    } catch (error) {
        next(error);
    }
}

async function findByIdAndUpdate(req, res, next) {
    try {
        res.json({ updated: await service.findByIdAndUpdate(req.body.card) });
    } catch (error) {
        next(error);
    }
}

async function deleteById(req, res, next) {
    try {
        res.json({ deleted: await service.deleteById(req.params.cardId) });
    } catch (error) {
        next(error);
    }
}

// Create a new card
router.post('/', expressJoiValidator(validators.create), authorize.userRoleCheck(role.admin), create);

// Retrieve all cards
router.get('/', findAll);

// Retrieve a single card with cardId
router.get('/:cardId', findOne);

// Update a card with cardId
router.put('/', expressJoiValidator(validators.update), authorize.userRoleCheck(role.admin), findByIdAndUpdate);

// Delete a card with cardId
router.delete('/:cardId', authorize.userRoleCheck(role.admin), deleteById);
module.exports = router;
