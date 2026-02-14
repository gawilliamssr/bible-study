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
