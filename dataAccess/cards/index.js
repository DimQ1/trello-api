const { CardsRepository } = require('./cardsRepository');
const cards = require('../assets/cards');

module.exports = new CardsRepository(cards);
