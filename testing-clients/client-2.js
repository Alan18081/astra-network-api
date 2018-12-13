const io = require('socket.io-client');
const NEW_FRIENDSHIP_REQUEST = 'NEW_FRIENDSHIP_REQUEST';

const client2 = io('http://localhost:4000/friendship',
	{ query: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwiaWQiOjIsImlhdCI6MTU0NDcxMzE2OCwiZXhwIjoxNTQ0Nzk5NTY4fQ.KtSPD6N1j8AXw_rZmMpKbJLDB0wndVnd40ZCfYc7xN8'
	} }
);

client2.on(NEW_FRIENDSHIP_REQUEST, data => {
	console.log(data);
});




