const saveObjectToJsonFile = require('../../helpers/saveObjectToJsonFile')('boards');

class BoardRepository {
    constructor(boardsColection) {
        this._boards = boardsColection;
        this.lastId = Math.max(...this._boards.map(card => card.id), 0);
    }

    _getNextId() {
        this.lastId += 1;

        return this.lastId;
    }

    async _saveBoards(boardsForSaving) {
        await saveObjectToJsonFile.save(boardsForSaving);
    }

    async create(board) {
        board.id = this._getNextId();
        board.created = new Date();
        this._boards.push(board);
        await this._saveBoards(this._boards);

        return board;
    }

    async findByIdAndUpdate(board) {
        const isUpdated = !this._boards.every((itemBoard, index, arrayBoards) => {
            if (itemBoard.id === +board.id) {
                arrayBoards.splice(index, 1, board);

                return false;
            }

            return true;
        });
        if (isUpdated) {
            await this._saveBoards(this._boards);
        }

        return isUpdated;
    }

    async deleteById(id) {
        const isUpdated = !this._boards.every((board, index, arrayBoards) => {
            if (board.id === +id) {
                arrayBoards.splice(index, 1);

                return false;
            }

            return true;
        });
        if (isUpdated) {
            await this._saveBoards(this._boards);
        }

        return isUpdated;
    }

    getall() {
        return this._boards;
    }

    findOne(id) {
        const board = this._boards.find(boardItem => boardItem.id === +id);

        return board;
    }
}
exports.BoardRepository = BoardRepository;
