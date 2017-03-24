angular.module('cardcast-receiver', [
  'ngSanitize'
])
//set up  controller for Receiver.
.controller('MainController', function($scope, $sanitize, Markdown, $http, $timeout) {
  //TODO
  //Send get request to decks to grab current card
    //Change scope.text to current.text??
  //Set up polling function (Also in senders)
  var newCardRequest = function (deckId) {
    $http({
      method: 'GET',
      url: `/api/decks/${deckId}`,
      // dataType: 'jsonp',
      headers: {'Content-Type': 'application/json'},
    }).then(function success(res) {
      console.info(res.data.current)
      res.data.cards.forEach((card) => {
        if (card._id === res.data.current) {
          $scope.text = card.card;

          $timeout(function(){newCardRequest(deckId)}, 1000);
        }
      })
      //update the current card being displayed
    }, function error(res) {
      console.error(res)
    })
  };

  //Artificial test of polling
  //newCardRequest('58d2ec5a63d0c867c5ec779f');

  //default message when no one is casting
  $scope.text = '<h2>Welcome to CardCast!</h2><br/>Nothing has been cast yet...';

})
.factory('Markdown', function() {
  var compile = function(text) {
    return marked(text);
  };
  return {
    compile: compile
  };
});
