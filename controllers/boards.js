const { services } = require('../services/boards');

class BoardController {
    async create(req, res, next) {
        try {
            res.json(await services.create(req.body.board));
        } catch (error) {
            next(error);
        }
    }

    getAll(req, res, next) {
        try {
            res.json(services.getAll());
        } catch (error) {
            next(error);
        }
    }

    findOne(req, res, next) {
        try {
            res.json(services.findOne(req.params.boardId));
        } catch (error) {
            next(error);
        }
    }

    async findByIdAndUpdate(req, res, next) {
        try {
            res.json({ updated: await services.findByIdAndUpdate(req.body.board) });
        } catch (error) {
            next(error);
        }
    }

    async deleteById(req, res, next) {
        try {
            res.json({ deleted: await services.deleteById(req.params.boardId) });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BoardController();
