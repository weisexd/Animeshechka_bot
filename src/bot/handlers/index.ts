import onMessage from "./messageHandler";
import { Telegraf } from "telegraf";

const initializeHandlers = (bot: Telegraf) => {
    onMessage(bot);
}

export default initializeHandlers;