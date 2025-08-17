import { MiddlewareFunction } from '../types/Middleware';

const logging: MiddlewareFunction = (bot) => {
    bot.use((ctx, next) => {
        const text = ctx.message && 'text' in ctx.message ? ctx.message.text : 'non-text message';
        console.log(`Received: ${text || 'unknown'}`);
        return next();
    });
}

export default logging;