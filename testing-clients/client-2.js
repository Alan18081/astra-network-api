const io = require('socket.io-client');
const ADDED_NOTE = '[Notes] Added Note';
const UPDATED_NOTE = '[Notes] Updated Note';
const REMOVED_NOTE = '[Notes] Removed Note';

const client2 = io('http://localhost:4000/notes',
	{ query: {
		token: 'Hello'
		// token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsYW5lckBnbWFpbC5jb20iLCJpZCI6MywiaWF0IjoxNTQzNTY0MzU5LCJleHAiOjE1NDM2NTA3NTl9.JH5RhUi15sbEr2KBOgiowNGe5JFYOPtsTQS8xSua_xM'
	} }
);

client2.on(ADDED_NOTE, message => {
	console.log(message);
});

client2.on('error', err => {
	console.error('My error', err);
});

client2.on('server:error', err => {
	console.log('Server error', err);
});

client2.on('disconnect', err => {
	console.log('Disconnect', err);
})
//
// client2.emit('ADD_NEW_USER', {
// 	chatId: 6,
// });
//
// client2.on('UPDATED_CHAT', message => {
// 	console.log(message);
// });
//
//
// client2.on('ADD_MESSAGE', message => {
// 	console.log(message);
// });
//
// client2.emit('REMOVE_MESSAGE', { messageId: 25, chatId: 6 });



