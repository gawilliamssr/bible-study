import { render, screen } from "@testing-library/react";
import NoteEditor from "../components/NoteEditor";

describe("NoteEditor", () => {
  it("renders the notes placeholder panel", () => {
    render(<NoteEditor />);

    expect(screen.getByRole("heading", { name: "Notes" })).toBeInTheDocument();
    expect(
      screen.getByText("Capture insights tied to passages or sermons.")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Start a new note...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Export Notes" })
    ).toBeInTheDocument();
    expect(screen.getByText("Recent Notes")).toBeInTheDocument();
    expect(
      screen.getByText("John 3:16 · \"Loved the world\" reflection")
    ).toBeInTheDocument();
  });
});
