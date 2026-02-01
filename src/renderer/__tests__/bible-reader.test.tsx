import { render, screen } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import BibleReader from "../components/BibleReader";

type MockChapter = {
  book: string;
  chapter: number;
  translation: string;
  verses: { verse: number; text: string }[];
};

describe("BibleReader", () => {
  const mockChapter: MockChapter = {
    book: "John",
    chapter: 3,
    translation: "ESV",
    verses: [
      {
        verse: 16,
        text: "For God so loved the world..."
      }
    ]
  };

  beforeEach(() => {
    const mockFetch = vi.fn(async () => ({
      ok: true,
      json: async () => mockChapter
    }));

    vi.stubGlobal("fetch", mockFetch as unknown as typeof fetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders chapter data from the mock Bible JSON", async () => {
    render(<BibleReader />);

    expect(await screen.findByText("John 3 (ESV)")).toBeInTheDocument();
    expect(
      screen.getByText("For God so loved the world...")
    ).toBeInTheDocument();
  });
});
