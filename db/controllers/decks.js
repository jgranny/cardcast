var DeckModel = require('../models/decks.js');

// find all of the decks's cards in the database using their id
exports.findAll = function() {
  return DeckModel.find();
};

// insert a new card into the database
exports.insertOne = function(card) {
  return DeckModel.create(card);
};

// find a card in the database using the card id
exports.findOne = function(id) {
  return DeckModel.findOne({_id: id});
};

// update the card info in the database
exports.updateDeck = function(card) {
  return DeckModel.update({_id: card.id}, {$set: {title: card.title, card: card.card}});
};

// delete a card from the database
exports.deleteDeck = function(id) {
  return DeckModel.remove({_id: id});
};
