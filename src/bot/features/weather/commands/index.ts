import { Telegraf } from 'telegraf';
import weather from './weather';

const initializeWeatherCommands = async (bot: Telegraf) => {
    weather(bot);
} 

export default initializeWeatherCommands;