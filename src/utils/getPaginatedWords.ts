import fs from "fs";
import path from "path";
import { Language } from "@/types";

// Read and parse the words file with pagination
const getPaginatedWords = (
  language: Language,
  version: string,
  startIndex: number,
  chunkSize: number
): Promise<{ words: string[]; lastPage: number }> => {
  const WORDS_FILE_PATH = path.resolve(
    `data/words/${language}/${version}`,
    "words.txt"
  );

  return new Promise((resolve, reject) => {
    // Open the file stream
    const stream = fs.createReadStream(WORDS_FILE_PATH, { encoding: "utf-8" });
    let rawData = "";
    let words: string[] = [];
    let lastPage = 1;
    const isVersionParsed = false;

    stream.on("data", (chunk) => {
      rawData += chunk;
    });

    stream.on("end", () => {
      try {
        if (!isVersionParsed) {
          words = Array.from(rawData.split("\n"));
          rawData = "";
          lastPage = Math.ceil(words.length / chunkSize);
          resolve({
            words: words.slice(startIndex, startIndex + chunkSize),
            lastPage,
          });
          words = [];
        }
      } catch {
        reject(new Error("Failed to load the words"));
      }
    });

    stream.on("error", (err) => {
      console.log(err);
      reject(new Error(`Failed to read the words`));
    });
  });
};

export default getPaginatedWords;
