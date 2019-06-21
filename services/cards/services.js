const cards = require('../../dataAccess/cards');

class CardService {
    create(card) {
        return cards.create(card);
    }

    findByIdAndUpdate(card) {
        return cards.findByIdAndUpdate(card);
    }

    deleteById(id) {
        return cards.deleteById(id);
    }

    getAll() {
        return cards.getAll();
    }

    findOne(id) {
        return cards.findOne(id);
    }
}

module.exports = new CardService();
