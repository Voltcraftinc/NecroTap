import TelegramBot from 'node-telegram-bot-api';

// Replace 'YOUR_NEW_BOT_TOKEN' with your actual bot token from BotFather
const bot = new TelegramBot('7917220304:AAGfQqGhaf2HVdOrXfGSwdhYb3odz1QZPSY', { polling: true });

// Handle the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to NecroTap! Ready to tap and earn those Mutabytes? Type "tap" to start earning!');
});

// Handle the 'tap' command (you can expand this with game logic)
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text.toLowerCase();

    if (messageText === 'tap') {
        bot.sendMessage(chatId, 'You tapped! You earned 10 Mutabytes!');
    } else {
        bot.sendMessage(chatId, 'Type "tap" to play the game.');
    }
});
