const users = require('./users');
const login = require('./login');
const boards = require('./boards');
const cards = require('./cards');

module.exports = {
    usersController: users,
    loginController: login,
    boardsController: boards,
    cardsController: cards
};
