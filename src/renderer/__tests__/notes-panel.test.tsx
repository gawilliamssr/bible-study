import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import NoteEditor from "../components/NoteEditor";

describe("NoteEditor", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the notes editor", () => {
    render(<NoteEditor />);

    expect(screen.getByRole("heading", { name: "Notes" })).toBeInTheDocument();
    expect(
      screen.getByText("Capture insights tied to passages or sermons.")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Start a new note...")
    ).toBeInTheDocument();
    // "Recent Notes" heading should be there
    expect(screen.getByText("Recent Notes")).toBeInTheDocument();
    // Should be empty initially
    expect(screen.getByText("No saved notes yet.")).toBeInTheDocument();
  });

  it("allows creating and saving a new note", async () => {
    const user = userEvent.setup();
    render(<NoteEditor />);

    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Start a new note...");
    // Button text is "Save Note" initially
    const saveButton = screen.getByRole("button", { name: "Save Note" });

    await user.type(titleInput, "My New Note");
    await user.type(contentInput, "This is the content.");
    await user.click(saveButton);

    // Check if it appears in the list
    expect(screen.getByText("My New Note")).toBeInTheDocument();
    // "No saved notes yet" should be gone
    expect(screen.queryByText("No saved notes yet.")).not.toBeInTheDocument();
  });

  it("allows deleting a note", async () => {
    const user = userEvent.setup();
    // Pre-populate a note via localStorage
    const note = {
      id: "test-id",
      title: "Note to Delete",
      content: "Content",
      date: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("bible-app-notes", JSON.stringify([note]));

    render(<NoteEditor />);

    // Verify it's there
    expect(screen.getByText("Note to Delete")).toBeInTheDocument();

    // Find delete button (it's the only one in the list item)
    // We can use getByText("Delete") assuming it's visible or accessible
    const deleteButton = screen.getByRole("button", { name: "Delete note" });
    await user.click(deleteButton);

    // Verify it's gone
    expect(screen.queryByText("Note to Delete")).not.toBeInTheDocument();
    expect(screen.getByText("No saved notes yet.")).toBeInTheDocument();
  });
});
