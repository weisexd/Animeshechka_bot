import { Telegraf } from "telegraf";
import { config } from "dotenv";
import initializeCommands from "./commands/index";
import initializeMiddlewares from "./middlewares/index";

config();

if(!process.env.BOT_TOKEN) {
    throw new Error("BOT_TOKKEN is not defined in environment variables")
}

const bot = new Telegraf(process.env.BOT_TOKEN);

initializeMiddlewares(bot);
initializeCommands(bot);

export default bot;