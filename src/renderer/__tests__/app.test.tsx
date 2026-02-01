import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import App from "../App";

describe("App navigation", () => {
  beforeEach(() => {
    // Mock fetch to prevent BibleReader from causing side effects/warnings
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ translation: "KJV", books: [] }),
      })
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("switches between core views", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { name: "Reading", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bible" })).toHaveClass("is-active");

    await user.click(screen.getByRole("button", { name: "Notes" }));
    expect(screen.getByRole("heading", { name: "Notes", level: 2 })).toBeInTheDocument();
    expect(
      screen.getByText("Capture insights tied to passages or sermons.")
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sermons" }));
    expect(screen.getByRole("heading", { name: "Sermons", level: 2 })).toBeInTheDocument();
    expect(
      screen.getByText("Organize teaching videos and link them to passages.")
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Plans" }));
    expect(screen.getByRole("heading", { name: "Plans", level: 2 })).toBeInTheDocument();
    expect(
      screen.getByText("Stay on track with structured daily readings.")
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Journal" }));
    expect(screen.getByRole("heading", { name: "Journal", level: 2 })).toBeInTheDocument();
    expect(
      screen.getByText("Reflect on scripture, prayers, and study moments.")
    ).toBeInTheDocument();
  });
});
