import { Low } from 'lowdb';
import { JSONFilePreset } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { DBData } from './types/database';
import path from 'path';
import shuffle from '../../../../utils/shuffle';


export class WordsDatabase {
    private db!: Low<DBData>;
    private isInitialized: boolean = false;
    private saveTimer: NodeJS.Timeout | null = null;

    async init(): Promise<void> {
        if (this.isInitialized) return;

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const file = path.join(__dirname, '../../../data/randomWordsDb.json');

        this.db = await JSONFilePreset(file, { chats: {} })
        await this.db.read();
        this.isInitialized = true;

        console.log('📁 Words database initialized');
    }

    async saveWords(chatId: string, words: string[]): Promise<void> {
        if (!this.isInitialized) await this.init();

        this.db.data.chats[chatId] ||= { words: [], wordsCount: 0 }

        this.db.data.chats[chatId].words.push(...words);
        this.db.data.chats[chatId].wordsCount += words.length;

        this.saveTimeout();

        console.log(`💾 Saved ${words.length} words to chat  ${chatId}`);
    }

    async getRandomWords(chatId: string, count: number): Promise<string[]> {
        if (!this.isInitialized) await this.init();

        const chatData = this.db.data.chats[chatId];
        if (!chatData || chatData.words.length === 0) return [];

        const shuffled = shuffle([...chatData.words]);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    private saveTimeout(): void {
        if (this.saveTimer) clearTimeout(this.saveTimer);

        this.saveTimer = setTimeout(async () => {
            try {
                await this.db.write();
                console.log('💾 Words-Database saved to disk')
            } catch(error) {
                console.error('❌ Failed to save words-database: ' + error);
            }
        }, 3000);
    }
}