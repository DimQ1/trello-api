const saveObjectToJsonFile = require('../../helpers/saveObjectToJsonFile')('cards');

class CardsRepository {
    constructor(cardsColection) {
        this._cards = cardsColection;
        this.lastId = Math.max(...this._cards.map(card => card.id), 0);
    }

    _getNextId() {
        this.lastId += 1;

        return this.lastId;
    }

    async _sveCards(cardsForSaving) {
        await saveObjectToJsonFile.save(cardsForSaving);
    }

    async create(card) {
        card.id = this._getNextId();
        card.created = new Date();
        this._cards.push(card);
        await this._sveCards(this._cards);

        return card;
    }

    async Update(card) {
        const isUpdated = !this._cards.every((itemBoard, index, arraycards) => {
            if (itemBoard.id === +card.id) {
                arraycards.splice(index, 1, card);

                return false;
            }

            return true;
        });
        if (isUpdated) {
            await this._sveCards(this._cards);
        }

        return isUpdated;
    }

    async deleteById(id) {
        const isDeleted = !this._cards.every((card, index, arraycards) => {
            if (card.id === +id) {
                arraycards.splice(index, 1);

                return false;
            }

            return true;
        });
        if (isDeleted) {
            await this._sveCards(this._cards);
        }

        return isDeleted;
    }

    async getAll() {
        const allItems = await (new Promise((resolve, reject) => {
            try {
                resolve(this._cards);
            } catch (error) {
                reject(error);
            }
        }));

        return allItems;
    }

    async findById(id) {
        const card = await (new Promise((resolve, reject) => {
            try {
                const foundCard = this._cards.find(cardItem => cardItem.id === +id);
                resolve(foundCard);
            } catch (error) {
                reject(error);
            }
        }));

        return card;
    }
}
exports.CardsRepository = CardsRepository;
