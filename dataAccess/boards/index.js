const { BoardRepository } = require('./boardRepository');
const boards = require('../assets/boards');

module.exports = new BoardRepository(boards);
