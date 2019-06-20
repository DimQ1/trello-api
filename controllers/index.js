const users = require('../businessLayer/users');
const authenticate = require('../businessLayer/authenticate');
const boards = require('../businessLayer/boards');
const cards = require('../businessLayer/cards');

module.exports = {
    usersController: users.controller,
    loginController: authenticate.loginController,
    boardsController: boards.controller,
    cardsController: cards.controller
};
