var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deckSchema = new Schema({
  title: String,
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'deck'
  }]
});

var DeckModel = mongoose.model('Deck', deckSchema);

module.exports = DeckModel;
