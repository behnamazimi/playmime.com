import fs from "fs";

function validateWords(sourceFile, dictionaryFile) {
  try {
    // Read both files
    const sourceContent = fs.readFileSync(sourceFile, "utf8");
    const dictionaryContent = fs.readFileSync(dictionaryFile, "utf8");

    // Process dictionary file - split into lines and filter out empty lines
    const dictionaryWords = new Set(
      dictionaryContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
    );

    // Process source file - split into lines and filter out comments and empty lines
    const sourceWords = sourceContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));

    // Find words that don't exist in dictionary
    const missingWords = sourceWords.filter(
      (word) => !dictionaryWords.has(word)
    );

    return {
      missingWords,
      totalChecked: sourceWords.length,
      totalMissing: missingWords.length,
    };
  } catch (error) {
    console.error("Error processing files:", error.message);
    process.exit(1);
  }
}

// Get file paths from command line arguments
const [, , sourceFile, dictionaryFile] = process.argv;

if (!sourceFile || !dictionaryFile) {
  console.error("Usage: node script.js <source-file> <dictionary-file>");
  process.exit(1);
}

// Run the validation
const result = validateWords(sourceFile, dictionaryFile);

// Output results
console.log("\nValidation Results:");
console.log("------------------");
console.log(`Total words checked: ${result.totalChecked}`);
console.log(`Missing words found: ${result.totalMissing}`);
console.log("\nMissing words:");
console.log(result.missingWords.join("\n"));
