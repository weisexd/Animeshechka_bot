import { Telegraf } from 'telegraf';
import handleRandomMessage from '../features/randomWords/index';

const onMessage = (bot: Telegraf) => {
    bot.on('message', async (ctx) => {
        await handleRandomMessage(ctx);
    });
}

export default onMessage;