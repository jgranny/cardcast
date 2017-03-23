var DeckModel = require('../models/decks.js');
var cards = require('./cards.js')

// find all of the decks's decks in the database using their id
exports.findAll = function() {
  return DeckModel.find();
};

// insert a new deck into the database
exports.insertOne = function(deck) {
  return DeckModel.create(deck);
};

// find a deck in the database using the deck id
exports.findOne = function(id) {
  return DeckModel.findOne({_id: id});
};

// update the deck info in the database
exports.updateDeck = function(deck) {
  return DeckModel.update({_id: deck.id}, {$set: {title: deck.title, current: deck.current}});
};

// delete a deck from the database
exports.deleteDeck = function(id) {
  return DeckModel.remove({_id: id});
};

// get the card currently being cast
exports.grabCurrent = function(id) {
  return DeckModel.findOne({_id: id})
  .then(function(res) {
    return cards.findOne(res.current)
  })
}

// set the card to cast
exports.setCurrent = function(id) {
  return DeckModel.findOne({_id: id})
  .then(function (res) {
    return DeckModel.update({$set: {current: res}})
  })
}
