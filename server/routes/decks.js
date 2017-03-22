var express = require('express');
var router = express.Router();
var deckController = require('../../db/controllers/decks.js');
var helpers = require('../helpers');


router.get('/', helpers.isAuth, function(req, res, next) {
  // req has a user object given by passport
  deckController.findAll(req.user._id)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });

});

module.exports = router;
