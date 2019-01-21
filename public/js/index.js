let socket = io();
    
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
  console.log(msg);
  let li = $('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', (msg) => {
  let li = $('<li></li>');
  li.text(`${msg.from}: `);

  let a = $('<a target="_blank">My current location</a>');
  a.attr('href', msg.url);

  li.append(a)
  $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, (data) => {
    
  });
});

let locationButton = $('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('Unable to fetch location');
  });
});