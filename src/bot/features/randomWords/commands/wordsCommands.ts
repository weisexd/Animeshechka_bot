import { Telegraf } from 'telegraf';
import db from '../../settings/index';

const TOGGLE_COMMANDS = {
    'random_words': { path: 'randomWords.enable', name: 'Случайные сообщения' },
    'save_numbers': { path: 'randomWords.saveNumbers', name: 'Сохранение чисел' }
}

const NUMBER_COMMANDS = {
    'response_chance': { path: 'randomWords.responseChance', name: 'Шанс ответа',
        min: 1, max: 100 }
}

const enableNumbers = (bot: Telegraf) => {
    Object.entries(TOGGLE_COMMANDS).forEach(([command, config]) => {
        bot.command(command, async (ctx) => {
            const chatId = ctx.chat.id.toString();

            const currentValue = await db.getProperty(chatId, config.path);
            const newValue = !currentValue;

            await db.changeProperty(chatId, config.path, newValue);

            const status = newValue ? '✅ Включено' : '❌ Выключено';
            await ctx.reply(`${status}: ${config.name}`);
        });
    });

    Object.entries(NUMBER_COMMANDS).forEach(([command, config]) => {
        bot.command(command, async (ctx) => {
            const chatId = ctx.chat.id.toString();
            const args = ctx.message.text.split(' ').slice(1);

            if (!args?.length) {
                const current = await db.getProperty(chatId, config.path);
                return ctx.reply (`${config.name}: ${current}` +
                    `\nИспользование: /${command} <число от ${config.min} до ${config.max}>`)
            }

            const newValue = parseFloat(args[0]);
            if (isNaN(newValue) || newValue < config.min || newValue > config.max ) {
                return ctx.reply (`❌ Неверное значение! Используйте число от ${config.min} до ${config.max}`)
            }

            await db.changeProperty(chatId, config.path, newValue);
            await ctx.reply(`✅ ${config.name} установлено: ${newValue}`)
        });
    });
}

export default enableNumbers;