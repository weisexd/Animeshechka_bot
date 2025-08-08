import { Telegraf } from 'telegraf';
import ping from './ping';

export default function initializeCommands(bot: Telegraf): void {
    ping(bot);
}