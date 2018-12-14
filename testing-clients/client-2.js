const io = require('socket.io-client');
const NEW_FRIENDSHIP_REQUEST = 'NEW_FRIENDSHIP_REQUEST';
const FETCH_INCOMING_FRIENDSHIP_REQUESTS = 'FETCH_INCOMING_FRIENDSHIP_REQUESTS';
const SEND_FRIENDSHIP_REQUEST = 'SEND_FRIENDSHIP_REQUEST';

const client2 = io('http://localhost:4000/friendship',
	{ query: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwiaWQiOjIsImlhdCI6MTU0NDcxMzE2OCwiZXhwIjoxNTQ0Nzk5NTY4fQ.KtSPD6N1j8AXw_rZmMpKbJLDB0wndVnd40ZCfYc7xN8'
	} }
);
//
// client2.on(NEW_FRIENDSHIP_REQUEST, data => {
// 	console.log(data);
// });
//
// client2.emit(FETCH_INCOMING_FRIENDSHIP_REQUESTS, { id: 1 }, data => {
// });
// client2.on(FETCH_INCOMING_FRIENDSHIP_REQUESTS, data => {
// 	console.log('Requests', data);
// });

client2.emit(SEND_FRIENDSHIP_REQUEST, { receiverId: 2, message: 'Hi, I want to become your friend' });









