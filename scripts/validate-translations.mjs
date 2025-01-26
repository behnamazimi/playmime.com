import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = path.join(__dirname, "..", "public", "locales");

const getAllKeys = (obj, prefix = "") => {
  return Object.keys(obj).reduce((keys, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      return [...keys, ...getAllKeys(obj[key], fullKey)];
    }
    return [...keys, fullKey];
  }, []);
};

function validateTranslations() {
  const result = {
    mismatchedKeys: {},
  };

  // Get all JSON files
  const localeFiles = fs
    .readdirSync(LOCALES_DIR)
    .filter((file) => file.endsWith(".json"));

  if (localeFiles.length === 0) {
    console.error("❌ No translation files found");
    process.exit(1);
  }

  // Use first locale file as reference
  const refFile = localeFiles[0];
  const refContent = JSON.parse(
    fs.readFileSync(path.join(LOCALES_DIR, refFile), "utf8")
  );
  const refKeys = getAllKeys(refContent).sort();

  // Compare each language file with the reference
  localeFiles.forEach((file) => {
    if (file === refFile) return;

    const langContent = JSON.parse(
      fs.readFileSync(path.join(LOCALES_DIR, file), "utf8")
    );
    const langKeys = getAllKeys(langContent).sort();

    const missingKeys = refKeys.filter((key) => !langKeys.includes(key));
    const extraKeys = langKeys.filter((key) => !refKeys.includes(key));

    if (missingKeys.length || extraKeys.length) {
      result.mismatchedKeys[file] = [
        ...missingKeys.map((key) => `Missing: ${key}`),
        ...extraKeys.map((key) => `Extra: ${key}`),
      ];
    }
  });

  return result;
}

console.log("🔍 Validating translations...");
const result = validateTranslations();

if (Object.keys(result.mismatchedKeys).length === 0) {
  console.log("✅ All translations are valid!");
  process.exit(0);
}

console.error("❌ Translation issues found:");
Object.entries(result.mismatchedKeys).forEach(([file, keys]) => {
  console.error(`\n${file}:`);
  keys.forEach((key) => console.error(`  ${key}`));
});

process.exit(1);
