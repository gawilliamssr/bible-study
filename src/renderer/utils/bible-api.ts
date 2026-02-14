import { BibleBook, BibleData, BiblePayload } from "../../types";

let cachedBibleData: BibleData | null = null;

const normalizeBibleData = (payload: BiblePayload): BibleData => {
  if (Array.isArray(payload)) {
    return {
      translation: "KJV",
      books: payload,
    };
  }

  return {
    translation: payload.translation ?? "KJV",
    books: payload.books ?? [],
  };
};

export const fetchBibleData = async (): Promise<BibleData> => {
  if (cachedBibleData) {
    return cachedBibleData;
  }

  const response = await fetch("/bible-kjv.json");
  if (!response.ok) {
    throw new Error(`Unable to load Bible data. Status: ${response.status}`);
  }

  const payload = (await response.json()) as BiblePayload;
  const data = normalizeBibleData(payload);

  if (!data.books?.length) {
    throw new Error("Bible dataset is missing book content.");
  }

  cachedBibleData = data;
  return data;
};
