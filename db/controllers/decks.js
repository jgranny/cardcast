var DeckModel = require('../models/decks.js');
var CardController = require('./cards.js');

// insert a new deck into the database
exports.insertOne = function(deck) {
  return DeckModel.create(deck);
};

// find all of the user's cards in the database using their id
exports.findAll = function() {
  return DeckModel.find();
};

// find a deck in the database using the deck id
exports.findOne = function(id) {
  return DeckModel.findOne({_id: id}).then(function(deck){
    return CardController.findAll(deck._id).then(function(cards){
      // TODO: don't hard code the properties
      return {
        _id: deck._id,
        title: deck.title,
        current: deck.current,
        cards: cards.slice()
      };
    });
  });
};

// update the deck info in the database
exports.updateDeck = function(deck) {
  return DeckModel.update({_id: deck.id}, {$set: {title: deck.title, current: deck.current}});
};

exports.setCurrent = function(deckID, slideID) {
  return DeckModel.update({_id: deckID}, {$set: {current: slideID}});
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
exports.setCurrent = function(deckID, slideID) {
  return DeckModel.update({_id: deckID}, {$set: {current: slideID}});
};
