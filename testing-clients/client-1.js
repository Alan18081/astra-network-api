const io = require('socket.io-client');

const namespace = 'Friendship';

const SEND_FRIENDSHIP_REQUEST = `[${namespace}] Send request`;
const NEW_FRIENDSHIP_REQUEST = `[${namespace}] New request`;
const FETCH_INCOMING_FRIENDSHIP_REQUESTS = `[${namespace}] Fetch incoming requests`;

const client = io('http://localhost:4000/friendship',
	{ query: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvZ3Vub3YwMEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNTQ0ODk5MzAxLCJleHAiOjE1NDQ5ODU3MDF9.d9U58A7hhvCPP9sRizMxxcSBNHXOaa8cnRz0MyYRZWk'
	} }
);

console.log('Hey');

client.emit(SEND_FRIENDSHIP_REQUEST, { page: 1, limit: 20 });

client.on('AUTH_ERROR', err => {
	console.error(err);
});
