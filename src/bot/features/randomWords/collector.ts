import db from './database/index';
import shouldProcess from '../../../utils/randomShould';
import shuffle from '../../../utils/shuffle';

const SAVE_CHANCE = 100;
const MAX_WORDS = 2;

const collectRandomMessages = async (chatId: string, message: string): Promise<void> => {
    if (!shouldProcess(SAVE_CHANCE)) return;

    const words = message
        .split(' ')
        .map(w => w.trim())
        .filter(word => word.length > 1 && isNaN(Number(word)) === true);


    if (words.length === 0) return;

    const randomCountToSave = Math.min(words.length, Math.floor(Math.random() * MAX_WORDS) + 1);
    const shuffled = shuffle(words);

    await db.saveWords(chatId, shuffled.slice(0, randomCountToSave));
}

export default collectRandomMessages;