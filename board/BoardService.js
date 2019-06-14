const boards = require('../assets/boards');

module.exports = class BoardService {
    create(board) {

    }

    findByIdAndUpdate(board) {

    }

    deleteById(id) {

    }

    findAll() {
        return boards;
    }

    findOne(id) {
        const board = boards.find(item => item.id === +id);

        return board;
    }
};
