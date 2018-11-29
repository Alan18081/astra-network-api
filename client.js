const io = require('socket.io-client');

const client = io('http://localhost:4000/messages',
	{ query: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwiaWQiOjIsImlhdCI6MTU0MzQxMjk3NSwiZXhwIjoxNTQzNDk5Mzc1fQ.pGnuStpJlKEz-Ilb-yGHOBU2_KuVG8ewEK0LNfWlfm0'
	} }
);

client.emit('ADD_NEW_USER', {
	chatId: 6,
	userId: 2
});

client.on('UPDATED_CHAT', message => {
	console.log(message);
});

client.emit('ADD_MESSAGE', {
	text: 'Alan',
	userId: 1,
	chatId: 6
});

client.on('ADD_MESSAGE', message => {
	console.log(message);
});



