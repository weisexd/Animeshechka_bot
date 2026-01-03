import { BotCommand } from '../../../types/BotCommand';
import scrape from '../scraper';

const download: BotCommand = (bot) => {
    bot.command('download', async (ctx) => {
        try {
            // Validating input and extracting URL
            const args = ctx.message.text.split(' ').slice(1);
            const desc = args.slice(1).join(' ');
            
            if (!args[0]) {
                return ctx.reply('Укажите ссылку на видео')
            }
            
            if (!args[0].includes('tiktok.com')) {
                return ctx.reply('Пожалуйста, введите действительную ссылку на TikTok видео.');
            }
            
            console.log('[Download Command] Downloading TikTok video: ', args[0]);
            const url = await scrape(args[0]);

            // Validating final URL
            if (!url) {
                return ctx.reply('Не удалось скачать видео. Пожалуйста, проверьте ссылку и попробуйте снова.');
            }

            // Sending video to user
            ctx.replyWithVideo(url, {
                reply_parameters: { message_id: ctx.message.message_id },
                caption: desc || undefined,
            });
        }
        catch (error) {
            console.error('[Download Command] Error downloading TikTok video: ', error);
        }
    });
};

export default download;