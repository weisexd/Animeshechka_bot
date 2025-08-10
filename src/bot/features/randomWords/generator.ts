import db from './database/index'
import shouldProcess from '../../../utils/randomShould';

const RESPONSE_CHANCE = 50;
const MAX_WORDS = 8;

const generateRandomMessage = async (chatId: string): Promise<string | null> => {
    console.log('Generating message...');
    if (!shouldProcess(RESPONSE_CHANCE)) return null;

    const randomAmount = Math.floor(Math.random() * MAX_WORDS) + 1;

    const words = await db.getRandomWords(chatId, randomAmount);
    const message = words.join(' ');

    return message;
}

export default generateRandomMessage;