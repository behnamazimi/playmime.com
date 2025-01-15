import { openDB } from "idb";
import { BaseWord, Language, RecentSyncDetails, Word } from "@/types";

const DB_NAME = "playmime-app";
const WORDS_STORE_NAME = "words";
const METADATA_STORE_NAME = "metadata";
const languageIndexName = "lang";
const categoryIndexName = "category";

// Initialize the IndexedDB store
// Initialize the IndexedDB store
async function initDB() {
  return await openDB(DB_NAME, 2, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (oldVersion < 1) {
        // Initial setup for version 1
        if (!db.objectStoreNames.contains(WORDS_STORE_NAME)) {
          const store = db.createObjectStore(WORDS_STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex(languageIndexName, languageIndexName, {
            unique: false,
          });
        }
        if (!db.objectStoreNames.contains(METADATA_STORE_NAME)) {
          db.createObjectStore(METADATA_STORE_NAME);
        }
      }
      if (oldVersion < 2) {
        // Add a new index for version 2
        if (db.objectStoreNames.contains(WORDS_STORE_NAME)) {
          const store = transaction.objectStore(WORDS_STORE_NAME);
          if (!store.indexNames.contains(categoryIndexName)) {
            store.createIndex(categoryIndexName, categoryIndexName, {
              unique: false,
            });
          }
        }
      }
    },
  });
}

export async function deleteDatabase() {
  return indexedDB.deleteDatabase(DB_NAME);
}

// Store words in IndexedDB
export async function storeWords(language: Language, words: BaseWord[]) {
  const db = await initDB();
  const tx = db.transaction(WORDS_STORE_NAME, "readwrite");
  const store = tx.objectStore(WORDS_STORE_NAME);

  await Promise.all(
    words.map((word) =>
      store.add({ word: word.word, lang: language, category: word.category })
    )
  );

  await tx.done;
}

// Get words by language
export async function getWordsByLanguage(language: Language): Promise<Word[]> {
  const db = await initDB();
  const tx = db.transaction(WORDS_STORE_NAME, "readonly");
  const store = tx.objectStore(WORDS_STORE_NAME);
  const index = store.index(languageIndexName);
  const words = await index.getAll(language);
  await tx.done;
  return words;
}

// Get a random word by language
export async function getRandomWord(language: Language): Promise<Word | null> {
  const db = await initDB();
  const tx = db.transaction(WORDS_STORE_NAME, "readonly");
  const store = tx.objectStore(WORDS_STORE_NAME);
  const index = store.index(languageIndexName);
  const count = await index.count(language);

  if (count === 0) return null;

  const randomIndex = Math.floor(Math.random() * count);
  const words = await index.getAll(language);
  await tx.done;

  return words[randomIndex] || null;
}

export async function getRandomWords(
  language: Language,
  count: number
): Promise<Word[]> {
  const db = await initDB();
  const tx = db.transaction(WORDS_STORE_NAME, "readonly");
  const store = tx.objectStore(WORDS_STORE_NAME);
  const index = store.index(languageIndexName);
  const words = await index.getAll(language);
  await tx.done;

  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function saveRecentSyncDetails(
  language: Language,
  details: RecentSyncDetails
) {
  const db = await initDB();
  const tx = db.transaction(METADATA_STORE_NAME, "readwrite");
  await db.put(METADATA_STORE_NAME, details, `recentSyncDetails-${language}`);
  await tx.done;
}

// Retrieve fetch options metadata
export async function getRecentSyncDetails(
  language: Language
): Promise<RecentSyncDetails | null> {
  const db = await initDB();
  const tx = db.transaction(METADATA_STORE_NAME, "readonly");
  const options = await db.get(
    METADATA_STORE_NAME,
    `recentSyncDetails-${language}`
  );
  await tx.done;
  return options || null;
}

async function clearWordsByLanguage(language: Language) {
  const db = await initDB();
  const tx = db.transaction(WORDS_STORE_NAME, "readwrite");
  const store = tx.objectStore(WORDS_STORE_NAME);
  const index = store.index(languageIndexName);
  const keys = await index.getAllKeys(language);
  await Promise.all(keys.map((key) => store.delete(key)));
  await tx.done;
}

async function clearMetaDataByLanguage(language: Language) {
  const db = await initDB();
  const tx = db.transaction(METADATA_STORE_NAME, "readwrite");
  await db.delete(METADATA_STORE_NAME, `recentSyncDetails-${language}`);
  await tx.done;
}

export async function clearAllDataByLanguage(language: Language) {
  await clearWordsByLanguage(language);
  await clearMetaDataByLanguage(language);
}
