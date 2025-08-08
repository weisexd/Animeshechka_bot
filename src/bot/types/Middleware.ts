import { Telegraf } from 'telegraf';

export type MiddlewareFunction = (bot: Telegraf) => void;