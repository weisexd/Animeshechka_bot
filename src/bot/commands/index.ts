import { Telegraf } from 'telegraf';
import ping from './ping';
import initializeRandomWordsCommands from '../features/randomWords/commands';
import help from './help';

export default function initializeCommands(bot: Telegraf): void {
    ping(bot);
    initializeRandomWordsCommands(bot);
    help(bot);
}