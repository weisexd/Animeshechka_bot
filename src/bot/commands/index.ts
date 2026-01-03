import { Telegraf } from 'telegraf';
import ping from './ping';
import help from './help';
import initializeRandomWordsCommands from '../features/randomWords/commands';
import initializeCommandsTikTokScraper from '../features/tiktokScraper/commands/index'
export default function initializeCommands(bot: Telegraf): void {
    ping(bot);
    help(bot);

    initializeRandomWordsCommands(bot);
    initializeCommandsTikTokScraper(bot);
}