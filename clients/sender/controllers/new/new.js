angular.module('cardcast.new', [
  'ngSanitize'
])

.controller('NewCtrl', function($scope, $sanitize, $location, Service, deck) {
  // Declare message in scope
  $scope.message = '';
  $scope.deck = deck

  // Function that creates new card
  $scope.createCard = function() {

    // Format the card info to match card model schema
    var cardInfo = {
      title: $scope.title,
      card: $scope.message,
      deck: deck._id
    };


    // Use the createCard function from the Service factory
    Service.createCard(cardInfo)
      .then(function(resp) {
        console.log("deck id", deck._id)
        console.log("should match .deck", cardInfo)
        console.log("actual response from server", resp)
        $location.path('/deck/:' + resp.deck);
      });

  };

  // Function that watches for changes in message
  $scope.changes = function() {

    // If message is empty show Your Card Preview
    if ($scope.message === '') {
      $scope.preview = $sanitize('<h3>Your Card Preview</h3>');
    } else {
      // Else compile the message and set it as preview
      $scope.preview = $sanitize(Service.markDownCompile($scope.message));
    }
  };
    $scope.goBack = function () {
    $location.path('/deck/:' + deck._id)
  }
  // Function is called initially to set the preview title
  $scope.changes();

});
