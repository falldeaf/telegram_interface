const axios = require('axios');

axios.post('http://localhost:3600/chat/telegrambot/', 'Please say test', {
	headers: {
	  'Content-Type': 'text/plain;charset=UTF-8'
	}
  })
.then(response => {
	console.log(response.data);
})
.catch(error => {
	console.error(error);
});