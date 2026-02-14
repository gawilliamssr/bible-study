import fs from "fs";
import path from "path";
import { performance } from "perf_hooks";

// Define Types (Copied from BibleReader.tsx)
type BibleBook = {
  name: string;
  abbrev?: string;
  chapters: string[][];
};

type BibleData = {
  translation: string;
  books: BibleBook[];
};

type BiblePayload = BibleData | BibleBook[];

const normalizeBibleData = (payload: BiblePayload): BibleData => {
  if (Array.isArray(payload)) {
    return {
      translation: "KJV",
      books: payload
    };
  }

  return {
    translation: payload.translation ?? "KJV",
    books: payload.books ?? []
  };
};

const BIBLE_PATH = path.resolve(__dirname, "../../../resources/bible-kjv.json");

const measurePerformance = () => {
  try {
    const fileContent = fs.readFileSync(BIBLE_PATH, "utf-8");

    // Measure JSON.parse
    const startParse = performance.now();
    const payload = JSON.parse(fileContent);
    const endParse = performance.now();
    const parseTime = endParse - startParse;

    // Measure normalization
    const startNormalize = performance.now();
    const data = normalizeBibleData(payload);
    const endNormalize = performance.now();
    const normalizeTime = endNormalize - startNormalize;

    console.log(`JSON.parse time: ${parseTime.toFixed(2)} ms`);
    console.log(`normalizeBibleData time: ${normalizeTime.toFixed(2)} ms`);
    console.log(`Total blocking time: ${(parseTime + normalizeTime).toFixed(2)} ms`);
    console.log(`Book count: ${data.books.length}`);
  } catch (err) {
    console.error("Error reading or processing Bible data:", err);
  }
};

measurePerformance();
