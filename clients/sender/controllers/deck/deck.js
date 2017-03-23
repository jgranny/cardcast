angular.module('cardcast.deck', [
  'ngSanitize'
])

.controller('DeckCtrl', function($scope, $location, $routeParams, $sanitize, Service, deck) {
  $scope.deck = deck;
  console.log('EDITING DECK', deck);
});
