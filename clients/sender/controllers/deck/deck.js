angular.module('cardcast.deck', [
  'ngSanitize'
])

.controller('DeckCtrl', function($scope, $location, $routeParams, $sanitize, Service, deck) {
  $scope.deck = deck;
  console.log(deck);
  // $scope.deck = {
  //   title: "Deck Title",
  //   current: "58d3f1a5d49b292ddd6953c5",
  //   cards: [
  //     {
  //       __v:0,
  //       _id:"58d3f1a5d49b292ddd6953c5",
  //       card:"test",
  //       deck:"58d15a201865f335663a8f78",
  //       title:"test"
  //     },
  //     {title: 'B'},
  //     {title: 'C'}
  //   ]
  // };
});
