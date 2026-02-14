export type BibleBook = {
  name: string;
  abbrev?: string;
  chapters: string[][];
};

export type BibleData = {
  translation: string;
  books: BibleBook[];
};

export type BiblePayload = BibleData | BibleBook[];

export const normalizeBibleData = (payload: BiblePayload): BibleData => {
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
