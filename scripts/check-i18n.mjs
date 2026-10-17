import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const locales = ["ar", "en", "fr"];
const messages = {};

for (const loc of locales) {
  const filePath = path.join(root, "messages", `${loc}.json`);
  const content = fs.readFileSync(filePath, "utf8");
  try {
    messages[loc] = JSON.parse(content);
  } catch (err) {
    console.error(`Failed to parse ${loc}.json:`, err);
    process.exit(1);
  }
}

function getKeys(obj, prefix = "") {
  let keys = [];
  for (const [key, val] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && !Array.isArray(val)) {
      keys = keys.concat(getKeys(val, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

const arKeys = getKeys(messages.ar);
const enKeys = getKeys(messages.en);
const frKeys = getKeys(messages.fr);

let hasError = false;

// Compare en vs ar
const enVsArDiff = enKeys.filter((k) => !arKeys.includes(k));
const arVsEnDiff = arKeys.filter((k) => !enKeys.includes(k));

if (enVsArDiff.length > 0) {
  console.error("Keys in en.json but missing in ar.json:", enVsArDiff);
  hasError = true;
}
if (arVsEnDiff.length > 0) {
  console.error("Keys in ar.json but missing in en.json:", arVsEnDiff);
  hasError = true;
}

// Compare en vs fr
const enVsFrDiff = enKeys.filter((k) => !frKeys.includes(k));
const frVsEnDiff = frKeys.filter((k) => !enKeys.includes(k));

if (enVsFrDiff.length > 0) {
  console.error("Keys in en.json but missing in fr.json:", enVsFrDiff);
  hasError = true;
}
if (frVsEnDiff.length > 0) {
  console.error("Keys in fr.json but missing in en.json:", frVsEnDiff);
  hasError = true;
}

// Check for legacy brand strings and misspellings
const forbiddenTerms = [
  "shahbandar",
  "الشهبندر",
  "شهبندر",
  "sinagro",
  "shahbandar.biz",
  "@shahbandarseed",
];

for (const loc of locales) {
  const content = fs.readFileSync(path.join(root, "messages", `${loc}.json`), "utf8").toLowerCase();
  for (const term of forbiddenTerms) {
    if (content.includes(term.toLowerCase())) {
      console.error(`Forbidden legacy term "${term}" found in messages/${loc}.json`);
      hasError = true;
    }
  }
}

// Check Arabic specific brand spelling
const arContent = fs.readFileSync(path.join(root, "messages", "ar.json"), "utf8");
if (arContent.includes("Seinagro")) {
  console.error('Latin brand "Seinagro" found in messages/ar.json. Arabic must use "سيناغرو".');
  hasError = true;
}

if (hasError) {
  console.error("❌ check-i18n failed!");
  process.exit(1);
} else {
  console.log(`✅ check-i18n passed! All 3 locales (${enKeys.length} keys each) have 100% key parity and no legacy strings.`);
}
