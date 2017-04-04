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
var friendsObject = {};

var app = {
  init: function() {
    $('#submitMessageButton').on('click', function(){
      var messageText = {
        username: 'matt',
        text: $('#messageField').val(),
        roomname: 'YUJINS WORLD'
      };
      app.send(messageText);
      app.renderRoom(messageText);
      app.renderMessage(messageText);
    });

   
    $('#changeRoomButton').on('click', function(){
      
      var roomName = $("option:selected").text();
      app.clearMessages();
      app.fetchByRoom(roomName);

    });

    $('#addRoomButton').on('click', function() {
     
      $('#addRoomField').css('display', 'block');
      $('#add').css('display', 'block');
      // var newRoomName = $("#addRoomField").val();
      // app.createNewRoom(newRoomName);

    });

    $('body').on('click','#add', function() {
      //alert('dd')
      var newRoomName = $("#addRoomField").val();
      app.createNewRoom(newRoomName);
      $('#addRoomField').css('display', 'none');
      $('#add').css('display', 'none');
      

    });

    $('body').on('click', '.username', function() {
      var friend = $(this).text();
      $('#friendsContainer').append('<p>' + friend + '</p>');
      friendsObject[friend] = true;
      app.fetch();
    });
    app.fetch();

  },
  send: function(message) {
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('Message sent')
     //app.renderMessage(data);
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
    $('#chats').empty()
  },
  renderMessage: function(message) {
    var user = '<a href=' + '"' + message.username + '">';
    if (message.username in friendsObject) {
      var userNameSpan = message.username;
      $('.' + userNameSpan).css('font-weight', 'bold');
      
    }

    $('#chats').append('<div class="msg"><p><span class="username">'  +  message.username + '</span>' + ': ' + 
    '<span class=' + '"' + message.username + '"' + '>' +  message.text + '</span>' +
      '</p><button>Block User</button></div>');  //'' + ''
   // $('div').append('<button>Add Friend</button>')
   // $('.msgText').css('font-weight', 'normal');
  },
  renderRoom: function(message) {
    if(typeof(message) === 'string') {
      console.log(message);
       $('#roomSelect').append('<p>message</p>');
    }
     
      if (!(message.roomname in roomnameObj)) {
        console.log('RENDER ROOM TEST')
        roomnameObj[message.roomname] = true;
        $('#roomDropdown').append('<option value=' + '"' + message.roomname + '"' + '>' + message.roomname + '</option>')
      }
  },
  fetchByRoom: function(roomName) {  //fetchByRoom('myRoom', undefined)

    console.log('ROOMNAME FROM SELECTOR ' ,roomName)
    $.ajax({
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages/' ,  //&limit=1000
      type: 'GET',
      data: 'order=-createdAt',//JSON.stringify(data, {order: "-createdAt", limit: 1000}),//JSON.stringify(data), 
      contentType: 'application/json',
      success: function (data) {
        console.log("inside fetch: " , data);
        var dataArray = data.results;
        //app.clearMessages();
        for (var i = 0; i < dataArray.length; i++) {
          if (dataArray[i].roomname === roomName) {
            app.renderMessage(dataArray[i]);
            console.log(dataArray[i]);
          }
          //app.renderMessage(dataArray[i]);
          //app.renderRoom(dataArray[i]);
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
  createNewRoom: function(roomName) {

  }

    
       

  
}



$(document).ready(function(){
  app.init()
})
