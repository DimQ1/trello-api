const boardService = require('./boardService.js');

class BoardController {
    async create(req, res, next) {
        try {
            res.json(await boardService.create(req.body.board));
        } catch (error) {
            next(error);
        }
    }

    getAll(req, res, next) {
        try {
            res.json(boardService.getAll());
        } catch (error) {
            next(error);
        }
    }

    findOne(req, res, next) {
        try {
            res.json(boardService.findOne(req.params.boardId));
        } catch (error) {
            next(error);
        }
    }

    async findByIdAndUpdate(req, res, next) {
        try {
            res.json({ updated: await boardService.findByIdAndUpdate(req.body.board) });
        } catch (error) {
            next(error);
        }
    }

    async deleteById(req, res, next) {
        try {
            res.json({ deleted: await boardService.deleteById(req.params.boardId) });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BoardController();
