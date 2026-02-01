import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import BibleReader from "../components/BibleReader";

type MockBible = {
  translation: string;
  books: { name: string; chapters: string[][] }[];
};

describe("BibleReader", () => {
  const mockBible: MockBible = {
    translation: "KJV",
    books: [
      {
        name: "Genesis",
        chapters: [
          ["In the beginning God created the heaven and the earth.", "Verse 2"],
          ["Thus the heavens and the earth were finished."]
        ]
      },
      {
        name: "Exodus",
        chapters: [["Now these are the names of the children of Israel..."]]
      }
    ]
  };

  beforeEach(() => {
    const mockFetch = vi.fn(async () => ({
      ok: true,
      json: async () => mockBible
    }));

    vi.stubGlobal("fetch", mockFetch as unknown as typeof fetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders chapter data and responds to dropdown navigation", async () => {
    const user = userEvent.setup();
    render(<BibleReader />);

    expect(await screen.findByText("Genesis 1 (KJV)")).toBeInTheDocument();
    expect(
      screen.getByText("In the beginning God created the heaven and the earth.")
    ).toBeInTheDocument();

    const bookSelect = screen.getByLabelText("Book");
    const chapterSelect = screen.getByLabelText("Chapter");
    const verseSelect = screen.getByLabelText("Verse");

    await user.selectOptions(bookSelect, "1");

    expect(await screen.findByText("Exodus 1 (KJV)")).toBeInTheDocument();
    expect(
      screen.getByText("Now these are the names of the children of Israel...")
    ).toBeInTheDocument();
    expect(chapterSelect).toHaveValue("0");
    expect(verseSelect).toHaveValue("1");
  });
});
