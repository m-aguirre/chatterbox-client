// YOUR CODE HERE:

//provide the url
  //add event listener that will display messages
var app = {};
// var message = {
//   username: 'm',
//   text: 'hey',
//   roomname: 'any'
// };

var app = {
  init: function() {
    //EVENT HANDLERS
  },
  send: function(message) {
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {

     app.renderMessage(data);
  },
  error: function (data) {
    console.error('chatterbox: Failed to send message', data);
  }
});
  },
  fetch: function(data) {
    $.ajax({
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
        console.log("inside fetch: " , data);
        var dataArray = data.results;
        for (var i = 0; i < dataArray.length; i++) {
          app.renderMessage(dataArray[i]);
        }
        // app.renderMessage(data);
  },
      error: function(data) {
        console.log('GET error');
  }
  })
  },
  clearMessages: function() {
    $('#chats').remove()
  },
  renderMessage: function(message) {
    console.log('render message: ' , message);
    $('#chats').append('<p>' + message.username + ': ' + message.text + '</p>');
  },
  renderRoom: function() {

  }

}

$(document).ready(function(){
  app.init()
})
