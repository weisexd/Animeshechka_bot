import db from './database/index'
import shouldProcess from '../../../utils/randomShould';

const RESPONSE_CHANCE = 50;
const MAX_WORDS = 8;

async function generateRandomMessage (chatId: string): Promise<string | void> {
    if (!shouldProcess(RESPONSE_CHANCE)) return;

    const randomAmount = Math.floor(Math.random() * MAX_WORDS) + 1;

    const words = await db.getRandomWords(chatId, randomAmount);
    const message = words.join(' ');

    return message;
}

export default generateRandomMessage;