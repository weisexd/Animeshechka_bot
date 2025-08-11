import { Telegraf } from 'telegraf';
import ping from './ping';
import initializeRandomWordsCommands from '../features/randomWords/commands';

export default function initializeCommands(bot: Telegraf): void {
    ping(bot);
    initializeRandomWordsCommands(bot);
}