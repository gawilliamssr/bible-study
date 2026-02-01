import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Journal from "../components/Journal";

describe("Journal", () => {
  it("renders the journal interface", () => {
    render(<Journal />);

    // Check header
    expect(screen.getByRole("heading", { name: "Journal", level: 3 })).toBeInTheDocument();
    expect(
      screen.getByText("Reflect on scripture, prayers, and study moments.")
    ).toBeInTheDocument();

    // Check entry input
    expect(screen.getByLabelText("New Entry")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write a reflection or prayer...")
    ).toBeInTheDocument();

    // Check meta controls
    expect(
      screen.getByPlaceholderText("Link passage or sermon (optional)")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save Entry" })).toBeInTheDocument();

    // Check recent entries
    expect(screen.getByRole("heading", { name: "Recent Entries" })).toBeInTheDocument();
    expect(screen.getByText("Apr 7, 2026")).toBeInTheDocument();
    expect(screen.getByText("Psalm 23")).toBeInTheDocument();
    expect(screen.getByText(/The shepherd imagery reminds me/)).toBeInTheDocument();

    // Check empty state
    expect(screen.getByText("No journal entries saved yet.")).toBeInTheDocument();
  });

  it("allows typing in the journal entry", async () => {
    const user = userEvent.setup();
    render(<Journal />);

    const textarea = screen.getByLabelText("New Entry");
    await user.type(textarea, "My prayer for today...");

    expect(textarea).toHaveValue("My prayer for today...");
  });
});
