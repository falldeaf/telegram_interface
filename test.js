//load dotenv
const axios = require('axios');


const msg = 'Is it cold?';

console.log(msg);
//Get the response from the API
axios.get('http://localhost:3019/newquery/cat_task/' + msg)
.then(response => {
	console.log(response.data.response);
	//bot.sendMessage(chatId, response.response);	
})
.catch(error => {
	console.log(error);
	//bot.sendMessage(chatId, error);	
});
