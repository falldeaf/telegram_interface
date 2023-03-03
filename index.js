//load dotenv
require('dotenv').config();
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
// 'msg' is the received Message from Telegram
// 'match' is the result of executing the regexp above on the text content
// of the message

	const chatId = msg.chat.id;
	const resp = match[1]; // the captured "whatever"
	// send back the matched "whatever" to the chat
	bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
	const chatId = msg.chat.id;

	console.log("saw " + msg.text);

	if(msg.text.startsWith('🏘')) {
		//Get the response from the API
		//axios.get('http://localhost:3019/newquery/cat_task/' + encodeURIComponent(msg.text))
		console.log("Home auto stuff");

	} else if(msg.text.startsWith('/clear')) {

		getAPI(chatId, 'http://localhost:3600/chat/clear/telegrambot/');

	} else {

		postAPI(chatId, 'http://localhost:3600/chat/telegrambot/', msg.text);

	}
});

function getAPI(chatId, url) {
	axios.get(url)
	.then(response => {
		console.log(response.data);
		bot.sendMessage(chatId, response.data);
	})
	.catch(error => {
		console.error(error);
		bot.sendMessage(chatId, "Couldn't contact chat");
	});	
}

function postAPI(chatId, url, text) {
	axios.post(url, text, {
		headers: {
			'Content-Type': 'text/plain;charset=UTF-8'
		}
	})
	.then(response => {
		console.log(response.data);
		bot.sendMessage(chatId, response.data);
	})
	.catch(error => {
		console.error(error);
		bot.sendMessage(chatId, "Couldn't contact chat");
	});
}