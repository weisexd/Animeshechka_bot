import { BotCommand } from '../types/BotCommand';

const ping: BotCommand = (bot) => {
    bot.command('ping', (ctx) => {
        ctx.reply('Pong!')
    });
};

export default ping;