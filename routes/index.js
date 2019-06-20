const express = require('express');

const router = express.Router();
const users = require('./users');
const login = require('./login');
const boards = require('./boards');
const cards = require('./cards');


router.use('/users', users);
router.use('/login', login);
router.use('/board', boards);
router.use('/card', cards);

module.exports = router;
