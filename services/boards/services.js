const boards = require('../../dataAccess/boards');

class BoardService {
    create(board) {
        return boards.create(board);
    }

    findByIdAndUpdate(board) {
        return boards.findByIdAndUpdate(board);
    }

    deleteById(id) {
        return boards.deleteById(id);
    }

    getAll() {
        return boards.getall();
    }

    findOne(id) {
        return boards.findOne(id);
    }
}

module.exports = new BoardService();
