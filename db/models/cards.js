var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
  title: String,
  card: String,
  deck: {
    type: Schema.Types.ObjectId,
    ref: 'Deck'
  }
});

var CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;
