angular.module('cardcast.deck', [
  'ngSanitize'
])

.controller('DeckCtrl', function($scope, $location, $routeParams, $sanitize, Service, deck) {
<<<<<<< HEAD
  $scope.deck = deck

  $scope.setCurrent = function(card) {
    Service.setCurrent(card)
      .then(res=> console.log(res))
  }
=======
  $scope.deck = deck;

  // Deletes selected card from the database
  $scope.deleteCard = function(card) {
    Service.deleteCard(card)
      .then(function(resp) {
        var index = $scope.deck.cards.indexOf(card);
        $scope.deck.cards.splice(index, 1);
      });
  };
>>>>>>> Fix deleting cards from a deck
});
