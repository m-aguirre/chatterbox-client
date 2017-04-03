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

  },
  send: function(message) {
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
 // data: {'message': $('#chats')}
  contentType: 'application/json',
  success: function (data) {
    //var msg = $('<p></p>');
    // msg.append(message.username + ': ');
    // msg.append(message.text)
    // console.log('chatterbox: Message sent');
   // $('#chats').html(msg);
   //console.log(data);
   app.renderMessage(data);
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
  },
  fetch: function(data) {
    console.log('fetch called')
    $.ajax({
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
        console.log('eyy')
    //var msg = $('<p></p>');
    // msg.append(message.username + ': ');
    // msg.append(message.text)
    // console.log('chatterbox: Message sent');
   // $('#chats').html(msg);
        console.log("inside fetch: " + data);
      

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
    console.log(message);
 //   var msg = $('<p></p>');
    // msg.append(message.username + ': ');
    // msg.append(message.text);
    // console.log(msg);
    var mess = app.fetch(message)
    $('#chats').append('<p>' + message.username + '</p>');
  }
}
// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//  // data: {'message': $('#chats')}
//   contentType: 'application/json',
//   success: function (data) {
//     var msg = $('<p></p>');
//     msg.append(message.username + ': ');
//     msg.append(message.text)
//     console.log('chatterbox: Message sent');
//     $('#chats').html(msg);
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });




// $(document).ready(function() {
//   something.init()
// });