import db from './database/index'
import shouldProcess from '../../../utils/randomShould';
import settings from '../settings/index';

const CHANCE_PATH = 'randomWords.responseChance';
const MAX_WORDS = 8;

const generateRandomMessage = async (chatId: string): Promise<string | null> => {
    console.log(`[${chatId}] Generating message...`);

    const responseChance = await settings.getProperty(chatId, CHANCE_PATH);

    if (!shouldProcess(responseChance)) return null;

    const randomAmount = Math.floor(Math.random() * MAX_WORDS) + 1;

    const words = await db.getRandomWords(chatId, randomAmount);
    const message = words.join(' ');

    return message;
}

export default generateRandomMessage;