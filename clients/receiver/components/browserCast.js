angular.module('cardcast-receiver', [
  'ngSanitize'
])
//set up  controller for Receiver.
.controller('MainController', function($scope, $sanitize, $location, Markdown, $http, $interval) {
  var cardId = ''

  var newCardRequest = function () {
    $http.defaults.headers.get = {'current': cardId}

    $http({
      method: 'GET',
      url: `/api/decks/${$location.absUrl().split("/").pop()}`,
    }).then(function success(res) {
      var found = false;
      cardId = res.data.current;

      res.data.cards.forEach((card) => {
        if (card._id === res.data.current) {
          found = true;
          $scope.text = $sanitize(Markdown.compile(card.card));
        }
        if(!found) {
          $scope.text = '<h2>Welcome to CardCast!</h2><br/>Nothing has been cast yet...';
        }
      })

    }, function error(res) {
      console.error(res)
    }).then(function () {
      newCardRequest();
    })
  };

  newCardRequest();
})
.factory('Markdown', function() {
  var compile = function(text) {
    return marked(text);
  };
  return {
    compile: compile
  };
});
