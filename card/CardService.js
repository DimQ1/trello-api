const fs = require('fs');
const path = require('path');
const cards = require('../assets/cards');

module.exports = class CardService {
    constructor() {
        this._getNextId = () => {
            const maxId = Math.max(...cards.map(o => o.id), 0);
            const nextId = maxId + 1;

            return nextId;
        };
        this._sveCards = () => new Promise((resolve, reject) => {
            const savePath = path.join(__dirname, '..', 'assets', 'cards.json');
            fs.writeFile(savePath, JSON.stringify(cards), (error) => {
                if (error) reject(error);
                resolve();
            });
        });
    }

    async create(card) {
        card.id = this._getNextId();
        cards.push(card);
        await this._sveCards()
            .catch((error) => { throw error; });

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
            await this._sveCards()
                .catch((error) => { throw error; });
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
            await this._sveCards()
                .catch((error) => { throw error; });
        }

        return isDeleted;
    }

    findAll() {
        return cards;
    }

    findOne(id) {
        const card = cards.find(item => item.id === +id);

        return card;
    }
};
