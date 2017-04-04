// YOUR CODE HERE:

//provide the url
  //add event listener that will display messages
var app = {};
// var message = {
//   username: 'm',
//   text: 'hey',
//   roomname: 'any'
// };

var roomnameObj = {};

var app = {
  init: function() {
    $('#submitMessageButton').on('click', function(){
      var messageText = {
        username: 'matt',
        text: $('#messageField').val(),
        roomname: 'YUJINS WORLD'
      };
      app.renderRoom(messageText);
      app.renderMessage(messageText);
    });

   
    $('#changeRoomButton').on('click', function(){
      //var roomName = $.(val();
      //$('#chats').filter(roomName).show();
    
    });
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
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages/' ,  //&limit=1000
      type: 'GET',
      data: 'order=-createdAt',//JSON.stringify(data, {order: "-createdAt", limit: 1000}),//JSON.stringify(data), 
      contentType: 'application/json',
      success: function (data) {
        console.log("inside fetch: " , data);
        var dataArray = data.results;
        for (var i = 0; i < dataArray.length; i++) {
          app.renderMessage(dataArray[i]);
          app.renderRoom(dataArray[i]);
          if (!(dataArray[i].roomname in roomnameObj)) {
            roomnameObj[dataArray[i].roomname] = true;
            console.log('room not in')
          }
        }

       
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
    //renderRoom(mesage);
    $('#chats').prepend('<p id=' + message.roomname + '>' + message.username + ': ' + message.text + '</p>');
  },
  renderRoom: function(message) {
    //check room name, if room does not already exist in roomDropdown
      //if true, append room to dropdown
      //console.log('render called');
      if (!(message.roomname in roomnameObj)) {
        console.log('RENDER ROOM TEST')
        roomnameObj[message.roomname] = true;
        $('#roomDropdown').append("<option value=" + message.roomname + ">" + message.roomname + "</option>")  //<option value="lobby">Lobby</option>
      }
  }
}



$(document).ready(function(){
  app.init()
})
