const TeleBot = require('telebot');

require('dotenv').config();

const bot = new TeleBot(process.env.BOT_TOKEN);
const chatId = process.env.CHAT_ID;


bot.on(['/start', '/hello'], (msg) => {
    console.log(`Received command "${msg.text}" from chat ${msg.chat.id}`);
    return bot.sendMessage(chatId, '👋 Hello');
});

bot.on('/help', (msg) => {
    console.log(`Received command "${msg.text}" from chat ${msg.chat.id}`);
    return msg.reply.text(
        '❓'
    );
});


bot.start(() => {
    console.log('Bot started!');
});
