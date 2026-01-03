import { Telegraf } from 'telegraf';
import download from './download';

const initializeRandomWordsCommands = async (bot: Telegraf) => {
    download(bot);
}

export default initializeRandomWordsCommands;