import { BotCommand } from '../types/BotCommand';

const help: BotCommand = (bot) => {
    bot.command('help', (ctx) => {
        const helpMessage = 
`📋 *Доступные команды:*

🎲 /randomWords \\- случайные сообщения вкл/выкл
🎯 /responsChance \\- шанс ответа \\(%\\)
💾 /saveNumbers \\- сохранение номеров вкл/выкл
📥 /download \\<url\\> \\- скачать TikTok видео
🌤️ /weather \\<город\\> \\- узнать погоду`;

        ctx.reply(helpMessage, { parse_mode: 'MarkdownV2' })
    });
};

export default help;