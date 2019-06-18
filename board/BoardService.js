const fs = require('fs');
const path = require('path');
const boards = require('../assets/boards');
const cards = require('../assets/cards');

module.exports = class BoardService {
    constructor() {
        this._getNextId = () => {
            const maxId = Math.max(...boards.map(o => o.id), 0);
            const nextId = maxId + 1;

            return nextId;
        };
        this._sveBoards = () => new Promise((resolve, reject) => {
            const savePath = path.join(__dirname, '..', 'assets', 'boards.json');
            fs.writeFile(savePath, JSON.stringify(boards), (error) => {
                if (error) reject(error);
                resolve();
            });
        });
    }

    async create(board) {
        board.id = this._getNextId();
        boards.push(board);
        await this._sveBoards();

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
            await this._sveBoards();
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
            await this._sveBoards();
        }

        return isUpdated;
    }

    findAll() {
        return boards;
    }

    findOne(id) {
        const board = boards.find(item => item.id === +id);

        return board;
    }
};
