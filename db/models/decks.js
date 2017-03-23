var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deckSchema = new Schema({
  title: String,
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Deck'
  }],
  current: {
    type: Schema.Types.ObjectId,
    ref: 'Card'
  }
});

var DeckModel = mongoose.model('Deck', deckSchema);

module.exports = DeckModel;
