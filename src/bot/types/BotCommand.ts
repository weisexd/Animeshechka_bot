import { Telegraf } from 'telegraf';

export type BotCommand = (bot: Telegraf) => void;