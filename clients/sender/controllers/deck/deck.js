angular.module('cardcast.deck', [
  'ngSanitize'
])

.controller('DeckCtrl', function($scope, $location, $routeParams, $sanitize, Service, deck) {
  $scope.deck = deck

  $scope.cards = [
  {
  __v:0,
_id:"58d3f1a5d49b292ddd6953c5",
card:"test",
deck:"58d3faf13db0e56e0c3248e2",
title:"test"
}, {title: 'B'}, {title: 'C'}];

  $scope.currentCard = {};
  
});
