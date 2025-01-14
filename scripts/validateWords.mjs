import fs from "fs";
import path from "path";

// Define categories for each language
const LANGUAGE_CATEGORIES = {
  en: [
    "Actions",
    "Movies/TV Shows",
    "Songs",
    "Objects",
    "Professions",
    "Books",
    "Animals",
    "Games/Sports",
    "Emotions",
    "Science",
    "Miscellaneous",
  ],
  fa: [
    "ضرب المثل",
    "فیلم/سریال",
    "آهنگ",
    "اشیا",
    "مشاغل",
    "مشاهیر",
    "حیوانات",
    "ورزش/بازی",
    "احساسات",
    "اماکن",
    "متفرقه",
    "خوراکی",
    "تاریخی",
    "علمی",
  ],
  // Add other languages as necessary
};

// Base path for the words directory
const BASE_PATH = path.resolve("data/words");

// Function to validate the words file for a specific language and version
const validateWordsFile = (lang, version) => {
  const WORDS_FILE_PATH = path.resolve(BASE_PATH, lang, version, "words.txt");

  try {
    if (!fs.existsSync(WORDS_FILE_PATH)) {
      console.error(
        `Words file not found for ${lang} ${version}: ${WORDS_FILE_PATH}`
      );
      return;
    }

    // Read file contents
    const fileContent = fs.readFileSync(WORDS_FILE_PATH, "utf-8");
    const lines = fileContent.split("\n").map((line) => line.trim());

    // Extract categories from the file
    const fileCategories = lines
      .filter((line) => line.startsWith("#"))
      .map((line) => line.slice(1).trim()); // Remove the '#' and trim spaces

    const predefinedCategories = LANGUAGE_CATEGORIES[lang];

    if (!predefinedCategories) {
      console.error(`No predefined categories for language: ${lang}`);
      return;
    }

    // Check for missing categories
    const missingCategories = predefinedCategories.filter(
      (category) => !fileCategories.includes(category)
    );

    if (missingCategories.length > 0) {
      console.error(
        `Validation failed for ${lang} ${version}. \nMissing categories:\n - ${missingCategories.join("\n - ")}`
      );
    } else {
      console.log(
        `Validation passed for ${lang} ${version}. All categories are present.`
      );
    }
  } catch (error) {
    console.error(
      `Error validating words file for ${lang} ${version}: ${error.message}`
    );
  }
};

// Function to validate all words files in the base directory for each language and version
const validateAllWordsFiles = () => {
  // Read all languages from the base directory
  const languages = fs.readdirSync(BASE_PATH);

  languages.forEach((lang) => {
    // Check if the language has predefined categories
    if (!LANGUAGE_CATEGORIES[lang]) {
      console.warn(`No predefined categories for language: ${lang}`);
      return;
    }

    // Read all versions for the current language
    const versions = fs.readdirSync(path.join(BASE_PATH, lang));

    versions.forEach((version) => {
      // Validate the words file for this language and version
      validateWordsFile(lang, version);
    });
  });
};

// Run the validation for all words files
validateAllWordsFiles();
