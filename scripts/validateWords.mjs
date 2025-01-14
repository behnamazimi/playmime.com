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
    "آهنگ/فیلم/سریال",
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

// Function to validate and fix the words file for a specific language and version
const validateAndFixWordsFile = (lang, version, fix = false) => {
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
      .filter((line) => line.startsWith("#")) // Remove the '#' and trim spaces
      .map((line) => line.slice(1).trim());

    const predefinedCategories = LANGUAGE_CATEGORIES[lang];

    if (!predefinedCategories) {
      console.error(`No predefined categories for language: ${lang}`);
      return;
    }

    // Check for missing categories
    const missingCategories = predefinedCategories.filter(
      (category) => !fileCategories.includes(category)
    );

    // Track fixes made to the file content
    let fixedContent = fileContent;

    // Fix missing categories if necessary
    if (missingCategories.length > 0) {
      console.error(
        `Categories validation failed for ${lang} ${version}. \nMissing categories:\n - ${missingCategories.join("\n - ")}`
      );
      if (fix) {
        console.log(`Fixing missing categories...`);
        fixedContent +=
          "\n" + missingCategories.map((cat) => `# ${cat}`).join("\n");
        console.log(`Fixed ${missingCategories.length} missing categories.`);
      }
    } else {
      console.log(
        `Categories validation passed for ${lang} ${version}. All categories are present.`
      );
    }

    // Check for duplicate words
    const wordLines = lines
      .filter((line) => !line.startsWith("#"))
      .filter((line) => line.trim());
    const wordSet = new Set();
    const duplicates = [];

    wordLines.forEach((word) => {
      if (wordSet.has(word)) {
        duplicates.push(word);
      } else {
        wordSet.add(word);
      }
    });

    // If duplicates are found, handle them
    if (duplicates.length > 0) {
      console.error(
        `Duplicated words validation failed for ${lang} ${version}. \nFound ${duplicates.length} duplicated words:\n - ${duplicates.join("\n - ")}`
      );
      if (fix) {
        console.log(`Fixing duplicated words...`);

        // Update content to keep only the unique words
        let fixedContentArray = [];
        lines.forEach((line) => {
          if (
            line.startsWith("#") ||
            !fixedContentArray.includes(line.trim())
          ) {
            fixedContentArray.push(line);
          }
        });
        fixedContent = fixedContentArray.filter(Boolean).join("\n");
        console.log(`Removed ${duplicates.length} duplicated words.`);
      }
    } else {
      console.log(
        `Duplicated words validation passed for ${lang} ${version}. No duplicated words.`
      );
    }

    // Write back the fixed content if any changes were made
    if (fix && fixedContent !== fileContent) {
      fs.writeFileSync(WORDS_FILE_PATH, fixedContent);
      console.log(`File fixed for ${lang} ${version}.`);
    }
  } catch (error) {
    console.error(
      `Error validating words file for ${lang} ${version}: ${error.message}`
    );
  }
};

// Function to validate all words files in the base directory for each language and version
const validateAllWordsFiles = (fix = false) => {
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
      // Validate and fix the words file for this language and version
      validateAndFixWordsFile(lang, version, fix);
    });
  });
};

// Check for the --fix argument and run accordingly
const fixMode = process.argv.includes("--fix");
validateAllWordsFiles(fixMode);
