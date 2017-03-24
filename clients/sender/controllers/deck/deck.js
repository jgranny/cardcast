angular.module('cardcast.deck', [
  'ngSanitize'
])
.controller('DeckCtrl', function($scope, $location, $routeParams, $sanitize, $sce, Service, deck) {
  $scope.deck = deck;
  $scope.preview = '';
  $scope.setCurrent = function(card) {
    $scope.deck.current = card._id;
    Service.setCurrent(card)
      .then(res=> console.log(deck))
  }

  // Deletes selected card from the database
  $scope.deleteCard = function(card) {
    Service.setCurrent({deck: card.deck, _id: null})
    Service.deleteCard(card)
      .then(function(resp) {
        var index = $scope.deck.cards.indexOf(card);
        $scope.deck.cards.splice(index, 1);
        console.log(deck.cards, $scope.deck.cards)

      });
  };

  $scope.$watch('deck.current', function(newValue, oldValue) {
    let content = $scope.deck.cards.filter(card => card._id === newValue)[0].card;
    $scope.preview = $sanitize(Service.markDownCompile(content));
  });
});
