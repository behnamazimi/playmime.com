import fs from "fs";
import path from "path";
import { BaseWord, Language } from "@/types";

// Read and parse the words file with pagination
const getPaginatedWords = (
  language: Language,
  version: string,
  startIndex: number,
  chunkSize: number
): Promise<{ words: BaseWord[]; lastPage: number }> => {
  const WORDS_FILE_PATH = path.resolve(
    `data/words/${language}/${version}`,
    "words.txt"
  );

  return new Promise((resolve, reject) => {
    // Open the file stream
    const stream = fs.createReadStream(WORDS_FILE_PATH, { encoding: "utf-8" });
    let rawData = "";
    let words: BaseWord[] = [];
    let lastPage = 1;

    stream.on("data", (chunk) => {
      rawData += chunk;
    });

    stream.on("end", () => {
      try {
        const lines = Array.from(rawData.split("\n"));
        let currentCategory = "";
        lines.forEach((line) => {
          // Get the category which starts with #
          if (line.startsWith("#")) {
            currentCategory = line.slice(1).trim();
          } else {
            words.push({ category: currentCategory, word: line });
          }
        });

        lastPage = Math.ceil(words.length / chunkSize);
        resolve({
          words: words.slice(startIndex, startIndex + chunkSize),
          lastPage,
        });
        words = [];
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
