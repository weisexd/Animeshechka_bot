import { Telegraf } from 'telegraf';
import db from '../../settings/index';

const COMMANDS = {
    'randomWords' : { path: 'randomWords.enable', name: 'Случайные сообщения' },
    'saveNumbers' : { path: 'randomWords.saveNumbers', name: 'Сохранение чисел' }
}

const enableNumbers = (bot: Telegraf) => {
    Object.entries(COMMANDS).forEach(([command, config]) => {
        bot.command(command, async (ctx) => {
            const chatId = ctx.chat.id.toString();

            const currentValue = await db.getProperty(chatId, config.path);
            const newValue = !currentValue;

            await db.changeProperty(chatId, config.path, newValue);

            const status = newValue ? '✅ Включено' : '❌ Выключено';
            await ctx.reply(`${status}: ${config.name}`);
        });
    });
}

export default enableNumbers;