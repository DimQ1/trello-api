const cards = require('../../dataAccess/cards');

class CardService {
    create(card) {
        return cards.create(card);
    }

    findByIdAndUpdate(card) {
        return cards.Update(card);
    }

    deleteById(id) {
        return cards.deleteById(id);
    }

    getAll() {
        return cards.getAll();
    }

    findById(id) {
        return cards.findById(id);
    }
}

module.exports = new CardService();
