const fs = require('fs');
const path = require('path');
const boards = require('../assets/boards');

class BoardRepository {
    constructor() {
        this._getNextId = () => {
            const maxId = Math.max(...boards.map(o => o.id), 0);
            const nextId = maxId + 1;

            return nextId;
        };
        this._saveBoards = boardsForSaving => new Promise((resolve, reject) => {
            const savePath = path.join(__dirname, '..', 'assets', 'boards.json');
            fs.writeFile(savePath, JSON.stringify(boardsForSaving), (error) => {
                if (error) reject(error);
                resolve();
            });
        });
    }

    async saveBoards(boardsForSaving) {
        this._saveBoards(boardsForSaving);
    }

    async create(board) {
        board.id = this._getNextId();
        board.created = new Date();
        boards.push(board);
        await this._saveBoards(boards);

        return board;
    }

    async findByIdAndUpdate(board) {
        const isUpdated = !boards.every((itemBoard, index, arrayBoards) => {
            if (itemBoard.id === +board.id) {
                arrayBoards.splice(index, 1, board);

                return false;
            }

            return true;
        });

        if (isUpdated) {
            await this._saveBoards(boards);
        }

        return isUpdated;
    }

    async deleteById(id) {
        const isUpdated = !boards.every((board, index, arrayBoards) => {
            if (board.id === +id) {
                arrayBoards.splice(index, 1);

                return false;
            }

            return true;
        });

        if (isUpdated) {
            await this._saveBoards(boards);
        }

        return isUpdated;
    }

    getall() {
        return boards;
    }

    findOne(id) {
        const board = boards.find(boardItem => boardItem.id === +id);

        return board;
    }
}

module.exports = new BoardRepository();
