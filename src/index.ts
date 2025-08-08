import bot from "./bot/bot";

bot.launch()
    .catch((error) => console.error("Failed to start bot: " + error));

console.log("Bot started successfully!");

process.once("SIGINT", () => bot.stop('SIGINT'));
process.once("SIGTERM", () => bot.stop('SIGTERM'));