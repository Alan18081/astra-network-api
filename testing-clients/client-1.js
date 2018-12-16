const io = require('socket.io-client');

 const SEND_FRIENDSHIP_REQUEST = 'SEND_FRIENDSHIP_REQUEST';
 const NEW_FRIENDSHIP_REQUEST = 'NEW_FRIENDSHIP_REQUEST';

const client = io('http://localhost:4000',
	{ query: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvZ3Vub3YwMEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNTQ0ODk5MzAxLCJleHAiOjE1NDQ5ODU3MDF9.d9U58A7hhvCPP9sRizMxxcSBNHXOaa8cnRz0MyYRZWk'
	} }
);

// client.emit(SEND_FRIENDSHIP_REQUEST, { receiverId: 2, message: 'Hi, I want to become your friend' });

client.on('AUTH_ERROR', err => {
	console.error(err);
});
