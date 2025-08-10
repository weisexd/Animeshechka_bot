export interface SettingsData {
    randomWords: {
        enable: boolean,
        saveNumbers: boolean,
        responseChance: number,
    }
}

export interface DBData {
    chats: Record<string, SettingsData>;
}