import { BotCommand } from '../../../types/BotCommand';
import { InputMediaPhoto } from 'telegraf/types';
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
            const result = await scrape(args[0]);

            // Validating result
            if (!result) {
                return ctx.reply('Не удалось скачать видео. Пожалуйста, проверьте ссылку и попробуйте снова.');
            }

            // Handling video result
            if (result.type == 'video') {
                await ctx.replyWithVideo(result.data as string, {
                    reply_parameters: { message_id: ctx.message.message_id },
                    caption: desc || undefined
                });
            }

            // Handling image result
            if (result.type == 'image') {
                const images = result.data as string[];

                if (images.length === 1) {
                    await ctx.replyWithPhoto(images[0], {
                        reply_parameters: { message_id: ctx.message.message_id },
                        caption: desc || undefined
                    });
                }
                else {
                    const group: InputMediaPhoto[] = images.map((img, index) => ({
                        type: 'photo',
                        media: img,
                        caption: index === 0 && desc ? desc : undefined
                    }));

                    await ctx.replyWithMediaGroup(group, {
                        reply_parameters: { message_id: ctx.message.message_id }
                    });
                }

            }
        }
        catch (error) {
            console.error('[Download Command] Error downloading TikTok video: ', error);
        }
    });
};

export default download;