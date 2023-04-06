const TeleBot = require('telebot');
const chat = require('./chat');
require('dotenv').config();

const bot = new TeleBot(process.env.BOT_TOKEN);


bot.on('newChatMembers', (msg) => { // add newChatMembers event handler to greet new users
    console.log(`New user ${msg.new_chat_member.username} joined chat ${msg.chat.id}`);
    return msg.reply.text(
        `🄺 Welcome to KeeperC!\n\n` +
        `We are a decentralized bank-and-wallet system based on smart contracts and Chainlink Automation.\n` +
        `Learn more at https://keeperc20.github.io/KeepERC20-docs/\n\n` +
        `Type /help to get started with the KeeperC chatbot.`
    );
});

bot.on('/help', (msg) => {
    console.log('Received /help command');
    return msg.reply.text(
        '/help - Get help with using the bot\n' +
        '/about - Learn more about KeeperC\n' +
        '/chat <text> - Send a text message to use KeeperC Chatbot'
    );
});

bot.on('/about', (msg) => {
    console.log('Received /about command');
    return msg.reply.text(
        `KeeperC is a decentralized bank-and-wallet system that allows users to participate with any ERC20 token through smart contracts and Chainlink Automation.` +
        `It offers Scheduled Transfer, Recoverable Transfer, and Expirable Approve functions for convenience, and provides the security of a centralized bank without compromising decentralization.` +
        `Learn more at https://keeperc20.github.io/KeepERC20-docs/`
    );
});

bot.on(/^\/chat (.+)$/, async (msg, props) => {
    console.log('Received /chat command');
    try {
        const [reason, answer] = await chat.GPT35Turbo(process.env.OPENAI_API_KEY, props.match[1]);

        let responseText;

        if (answer === 1) {
            responseText = `🄺 Scheduled Transfer\n\n${reason}`;
        } else if (answer === 2) {
            responseText = `🄺 Recoverable Transfer\n\n${reason}`;
        } else if (answer === 3) {
            responseText = `🄺 Expirable Approve\n\n${reason}`;
        } else {
            responseText = `${reason}`;
        }

        return msg.reply.text(responseText);
    } catch (error) {
        console.error('Error in /chat handler:', error);
    }
});


bot.start(() => {
    console.log('Bot started!');
});
