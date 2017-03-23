angular.module('cardcast-receiver', [
  'ngSanitize'
])
//set up  controller for Receiver.
.controller('MainController', function($scope, $sanitize, Markdown) {

  var isCasting = false;
  var who = null;
  var cardId = null;

  //broadcast makes the receiver send out a response message to all connected senders
  //it tells them who if anyone is currently casting and the id of the card that is being cast
  //when the card sender gets this broadcast, main.html changes 'cast' button to 'stop'
  var broadcast = function() {
    messageBus.broadcast(JSON.stringify({
      who: who,
      isCasting: isCasting,
      cardId: cardId
    }));
  };

  //TODO
  //Send get request to decks to grab current card
    //Change scope.text to current.text??
  //Set up polling function (Also in senders)
  

  //default message when no one is casting
  $scope.text = '<h2>Welcome to CardCast!</h2><br/>Nothing has been casted yet...';

})
.factory('Markdown', function() {
  var compile = function(text) {
    return marked(text);
  };
  return {
    compile: compile
  };
});
