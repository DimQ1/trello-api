const сardService = require('./сardService');

class CardsController {
    async create(req, res, next) {
        try {
            res.json(await сardService.create(req.body.card));
        } catch (error) {
            next(error);
        }
    }

    findAll(req, res, next) {
        try {
            res.json(сardService.getAll());
        } catch (error) {
            next(error);
        }
    }

    findOne(req, res, next) {
        try {
            res.json(сardService.findOne(req.params.cardId));
        } catch (error) {
            next(error);
        }
    }

    async findByIdAndUpdate(req, res, next) {
        try {
            res.json({ updated: await сardService.findByIdAndUpdate(req.body.card) });
        } catch (error) {
            next(error);
        }
    }

    async deleteById(req, res, next) {
        try {
            res.json({ deleted: await сardService.deleteById(req.params.cardId) });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CardsController();
