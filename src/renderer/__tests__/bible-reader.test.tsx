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
    class MockWorker {
      onmessage: ((event: MessageEvent) => void) | null = null;
      onerror: ((event: ErrorEvent) => void) | null = null;

      constructor(stringUrl: string | URL, options?: WorkerOptions) {}

      postMessage(message: any) {
        if (message === "load") {
          setTimeout(() => {
            if (this.onmessage) {
              this.onmessage({
                data: { type: "success", data: mockBible }
              } as MessageEvent);
            }
          }, 0);
        }
      }

      terminate() {}
    }

    vi.stubGlobal("Worker", MockWorker);
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders chapter data and responds to dropdown navigation", async () => {
    const user = userEvent.setup();
    render(
      <BibleReader
        focusLabel=""
        onPinVerse={vi.fn()}
        pinnedVerseIds={new Set()}
      />
    );

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
