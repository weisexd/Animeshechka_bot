import { Low } from 'lowdb';
import { JSONFilePreset } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { DBData, SettingsData } from './types/database';
import path from 'path';
import _ from 'lodash';

class SettingsDatabase {
    private db!: Low<DBData>;
    isInitialized: boolean = false;
    
    async init(): Promise<void> {
        if (this.isInitialized) return;

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const file = path.join(__dirname, '../../../../../data/settingsDB.json');

        this.db = await JSONFilePreset(file, { chats: {} })
        await this.db.read();
        this.isInitialized = true;

        console.log('📁 Settings database initialized');
    }

    async changeProperty(chatId: string, property: string, value: any): Promise<void> {
        if (!this.isInitialized) await this.init();
        await this.ensureChatExists(chatId);

        _.set(this.db.data.chats[chatId], property, value);

        await this.db.write();
    }

    async getProperty(chatId: string, property: string): Promise<any> {
        if(!this.isInitialized) await this.init();

        const chat = this.db.data.chats[chatId];
        if (!chat) return null;

        return _.get(chat, property, null);
    }

    private async ensureChatExists(chatId: string): Promise<void> {
        if (!this.db.data.chats[chatId]) {
            this.db.data.chats[chatId] = {
                randomWords: {
                    enable: true,
                    saveNumbers: false,
                    responseChance: 50,
                }
            };
            await this.db.write();
        }
    }
}

export default SettingsDatabase;