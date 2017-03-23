angular.module('cardcast.deck', [
  'ngSanitize'
])

.controller('DeckCtrl', function($scope, $location, $routeParams, $sanitize, Service, deck) {
  $scope.deck = deck

  $scope.setCurrent = function(card) {
    Service.setCurrent(card)
      .then(res=> console.log(res))
  }
});
