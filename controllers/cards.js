const { services } = require('../services/cards');

class CardsController {
    async create(req, res, next) {
        try {
            res.json(await services.create(req.body.card));
        } catch (error) {
            next(error);
        }
    }

    findAll(req, res, next) {
        try {
            res.json(services.getAll());
        } catch (error) {
            next(error);
        }
    }

    findOne(req, res, next) {
        try {
            res.json(services.findById(req.params.cardId));
        } catch (error) {
            next(error);
        }
    }

    async findByIdAndUpdate(req, res, next) {
        try {
            res.json({ updated: await services.findByIdAndUpdate(req.body.card) });
        } catch (error) {
            next(error);
        }
    }

    async deleteById(req, res, next) {
        try {
            res.json({ deleted: await services.deleteById(req.params.cardId) });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CardsController();
