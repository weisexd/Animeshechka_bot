export interface ChatData {
    words: string[];
    wordsCount: number;
}

export interface DBData {
    chats: Record<string, ChatData>;
}