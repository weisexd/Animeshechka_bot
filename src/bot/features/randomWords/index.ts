import collectRandomMessages from "./collector";
import generateRandomMessage from "./generator";
import getMessageType from "../../utils/getMessageType";
import settings from '../settings/index';
import { Context } from 'telegraf';

const STATE_PATH = 'randomWords.enable';

const handleRandomMessage = async (ctx: Context): Promise<void> => {
    
    try {
        if (!ctx.message || !ctx.chat) return;
        if (getMessageType(ctx.message) !== 'text') return;
        if (!('text' in ctx.message) || !ctx.message.text) return;
        
        const chatId = ctx.chat.id.toString();
        const message = ctx.message.text;

        const state = await settings.getProperty(chatId, STATE_PATH);
        if (!state) return;
        
        await collectRandomMessages(chatId, message);

        const generatedMessage = await generateRandomMessage(chatId);
        if (generatedMessage) await ctx.reply(generatedMessage);
    } catch (error) {
        console.error('❌ Error in handling random message: ', error);
    }
}

export default handleRandomMessage;