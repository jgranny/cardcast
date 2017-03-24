angular.module('cardcast.deck', [
  'ngSanitize'
])

.controller('DeckCtrl', function($scope, $location, $routeParams, $sanitize, $sce, Service, deck) {
  $scope.deck = deck
  $scope.preview = $sce.trustAsResourceUrl("/receiver/" + deck.current);
  $scope.setCurrent = function(card) {
    Service.setCurrent(card)
      .then(res=> console.log("card Casted"))
  }

  // Deletes selected card from the database
  $scope.deleteCard = function(card) {
    Service.deleteCard(card)
      .then(function(resp) {
        var index = $scope.deck.cards.indexOf(card);
        $scope.deck.cards.splice(index, 1);
      });
  };
});
