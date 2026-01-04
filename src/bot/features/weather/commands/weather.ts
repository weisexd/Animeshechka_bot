import { BotCommand } from '../../../types/BotCommand';
import getWeather from '../getWeather';

const weather: BotCommand = (bot) => {
    bot.command('weather', async (ctx) => {
        try {
            const args = ctx.message.text.split(' ').slice(1);
            
            if (!args[0]) {
                return ctx.reply('Укажите город для получения погоды\nПример: /weather Москва')
            }
            const cityName = args.join(' ');

            const result = await getWeather(cityName);

            if (!result.success) {
                return ctx.reply(`❌ Ошибка: ${result.error}`)
            }

            const { data } = result;

            const weatherMessage = `
🌍 ${data.location.name}, ${data.location.country}
🌡️ ${data.current.temp_c}°C (ощущается ${data.current.feelslike_c}°C)
☁️ ${data.current.condition.text}
💨 ${data.current.wind_kph} км/ч
💧 ${data.current.humidity}%
            `.trim();

            await ctx.reply(weatherMessage);
        }
        catch (error) {
            console.error('[Weather Command] Error: ', error);
            await ctx.reply('Error')
        }
    });
};

export default weather;