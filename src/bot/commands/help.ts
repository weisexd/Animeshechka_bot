import { BotCommand } from '../types/BotCommand';

const help: BotCommand = (bot) => {
    bot.command('help', (ctx) => {
        ctx.reply(`/randomWords - turn random messages ON or OFF \n` +
            `/responseChance - set the chance (%) for random messages \n` +
            `/saveNumbers - turn saving numbers ON or OFF`
        )
    });
};

export default help;