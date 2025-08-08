import { Telegraf } from 'telegraf';
import logging from './logging';

export default function (bot:Telegraf): void {
    logging(bot);
}