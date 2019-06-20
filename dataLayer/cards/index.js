const fs = require('fs');
const path = require('path');
const cards = require('../assets/cards');

class CardsRepository {
    constructor() {
        this._getNextId = () => {
            const maxId = Math.max(...cards.map(card => card.id), 0);
            const nextId = maxId + 1;

            return nextId;
        };
        this._sveCards = cardsForSaving => new Promise((resolve, reject) => {
            const savePath = path.join(__dirname, '..', 'assets', 'cards.json');
            fs.writeFile(savePath, JSON.stringify(cardsForSaving), (error) => {
                if (error) reject(error);
                resolve();
            });
        });
    }

    async create(card) {
        card.id = this._getNextId();
        card.created = new Date();
        cards.push(card);
        await this._sveCards(cards);

        return card;
    }

    async findByIdAndUpdate(card) {
        const isUpdated = !cards.every((itemBoard, index, arraycards) => {
            if (itemBoard.id === +card.id) {
                arraycards.splice(index, 1, card);

                return false;
            }

            return true;
        });

        if (isUpdated) {
            await this._sveCards(cards);
        }

        return isUpdated;
    }

    async deleteById(id) {
        const isDeleted = !cards.every((card, index, arraycards) => {
            if (card.id === +id) {
                arraycards.splice(index, 1);

                return false;
            }

            return true;
        });

        if (isDeleted) {
            await this._sveCards(cards);
        }

        return isDeleted;
    }

    getAll() {
        return cards;
    }

    findOne(id) {
        const card = cards.find(cardItem => cardItem.id === +id);

        return card;
    }
}

module.exports = new CardsRepository();
