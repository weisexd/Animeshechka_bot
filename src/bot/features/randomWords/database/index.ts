import { WordsDatabase } from "./wordsDatabase";

const wordsDatabase = new WordsDatabase();
wordsDatabase.init();

export default await wordsDatabase;