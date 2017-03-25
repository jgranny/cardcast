angular.module('cardcast-receiver', [
  'ngSanitize'
])
//set up  controller for Receiver.
.controller('ReceiverCtrl', function($scope, $sanitize, $location, Markdown, $http, $interval) {
  // //TODO
  //Send get request to decks to grab current card
    //Change scope.text to current.text??
  //Set up polling function (Also in senders)
  $scope.newCardRequest = function () {
    $http({
      method: 'GET',
      url: `/api/decks/${$location.absUrl().split("/").pop()}`,
      // dataType: 'jsonp',
      headers: {'Content-Type': 'application/json'},
    }).then(function success(res) {
      console.log('got')

      var found = false;

      res.data.cards.forEach((card) => {
        if (card._id === res.data.current) {
          found = true;
          $scope.text = $sanitize(Markdown.compile(card.card));
        }
        if(!found) {
          $scope.text = '<h2>Welcome to CardCast!</h2><br/>Nothing has been cast yet...';
        }
      })
      //update the current card being displayed
    }, function error(res) {
      console.error(res)
    })
  };
  //hacky way of getting the deck id
  //var deckId = $location.absUrl().split("/").pop()
  // $timeout(function(){newCardRequest()}, 1000);
  $scope.newCardRequest();
  longPolling = $interval(function(){$scope.newCardRequest()}, 1000);
  $scope.$on('$locationChangeStart', (e) => $interval.cancel(longPolling))

  //default message when no one is casting

})
.factory('Markdown', function() {
  var compile = function(text) {
    return marked(text);
  };
  return {
    compile: compile
  };
});
