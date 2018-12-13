const io = require('socket.io-client');

 const SEND_FRIENDSHIP_REQUEST = 'SEND_FRIENDSHIP_REQUEST';
 const NEW_FRIENDSHIP_REQUEST = 'NEW_FRIENDSHIP_REQUEST';

const client = io('http://localhost:4000/friendship',
	{ query: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsYW5tb3JnYW5AZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU0NDcxMTAzNiwiZXhwIjoxNTQ0Nzk3NDM2fQ.XIZVhg9keOcTEl6VoTE6gz31JgrxwUEYwzQjgh6vv9g'
	} }
);

client.emit(SEND_FRIENDSHIP_REQUEST, { receiverId: 2, message: 'Hi, I want to become your friend' });

client.on('error', err => {
	console.error(err);
})
