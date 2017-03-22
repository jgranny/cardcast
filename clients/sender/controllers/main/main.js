angular.module('cardcast.main', [])

// Set up main controller for Sender.
.controller('MainCtrl', function($scope, $timeout, $location, Service, user, deck) {

  // Set $scope.deck with info received from deck resolve
  $scope.deck = deck;

  //toggles popup warning using 'ng-show' in main.html
  $scope.showWarning = false;
  $scope.showDelete = false;
  $scope.username = user;

  // Deletes selected card from the database
  $scope.deleteDeck = function(deck) {
    Service.deleteDeck(deck)
      .then(function(resp) {
        var index = $scope.deck.indexOf(deck);
        $scope.deck.splice(index, 1);
        $scope.showDelete = false;
      });
  };

  $scope.warnDelete = function(card) {
    $scope.showDelete = true;
    $scope.currentCard = card;
  };

  $scope.cancelDelete = function() {
    $scope.showDelete = false;
  };

});
