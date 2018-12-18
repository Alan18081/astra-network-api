const io = require('socket.io-client');

const namespace = 'Friendship';

const NEW_FRIENDSHIP_REQUEST = 'NEW_FRIENDSHIP_REQUEST';
const FETCH_INCOMING_FRIENDSHIP_REQUESTS = `[${namespace}] Fetch incoming requests`;
const SEND_FRIENDSHIP_REQUEST = 'SEND_FRIENDSHIP_REQUEST';

const client2 = io('http://localhost:4000',
	{ query: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvZ3Vub3YwMEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNTQ1MTEzNTc0LCJleHAiOjE1NDUxOTk5NzR9.ofmMvTZ0ZR5YYPniKZSyF42oopn1s4aesPEAQWBnYkg'
	} }
);

client2.on('[Main] Socket is successfully connected', () => {
	console.log('It is connected');
    client2.emit(FETCH_INCOMING_FRIENDSHIP_REQUESTS, { id: 1 }, data => {
    });
});
//
// client2.on(NEW_FRIENDSHIP_REQUEST, data => {
// 	console.log(data);
// });
//

// client2.on(FETCH_INCOMING_FRIENDSHIP_REQUESTS, data => {
// 	console.log('Requests', data);
// });

client2.emit(SEND_FRIENDSHIP_REQUEST, { receiverId: 2, message: 'Hi, I want to become your friend' });









