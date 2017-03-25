var express = require('express');
var EventEmitter = require('events').EventEmitter;
var router = express.Router();
var deckController = require('../../db/controllers/decks.js');
var cardController = require('../../db/controllers/cards.js');
var helpers = require('../helpers');

var messageBus = new EventEmitter();
messageBus.setMaxListeners(100);


router.get('/', function(req, res, next) {
  // req has a user object given by passport
  deckController.findAll()
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });

});

router.get('/:id', helpers.isAuth, function(req, resp) {
  deckController.findOne(req.params.id)
    .then(function(result) {
      if (req.get('referer').includes('receiver')) {

        var listner = function (result) {
          var current = req.get('current')

          messageBus.once('event', function(data) {
            resp.send(data);
            resp.end();
          })
          if (result.current !== current) {
            messageBus.emit('event', result)
          }

        }

        setTimeout(() => listner(result), 500);

      } else {
        resp.send(result);
      }
    })
    .catch(function(err) {
      console.error(err);
    });
});

router.post('/', helpers.isAuth, function(req, res) {
  var deckInfo = {
    title: req.body.title
  };

  deckController.insertOne(deckInfo)
    .then(function(resp) {
      res.send(resp)
    })
    .catch(function(err) {
      console.error(err);
    });
});
router.post('/:id', helpers.isAuth, function(req, res, next) {
  deckController.deleteDeck(req.body._id)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });

});
router.put('/:id', helpers.isAuth, function(req, res) {
  deckController.setCurrent(req.body.deck, req.body._id)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });
});
router.put('/update/:id', helpers.isAuth, function(req, res) {
  deckController.updateDeck(req.body)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });
});
router.get('/receiver', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../clients/receiver/index.html'));
});

module.exports = router;
