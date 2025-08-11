import { Telegraf } from 'telegraf';
import wordsCommands from './wordsCommands';

const initializeRandomWordsCommands = async (bot: Telegraf) => {
    wordsCommands(bot);
} 

export default initializeRandomWordsCommands;