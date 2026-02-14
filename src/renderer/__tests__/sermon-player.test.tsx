import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SermonPlayer from "../components/SermonPlayer";

describe("SermonPlayer", () => {
  it("renders the sermon player interface", () => {
    render(<SermonPlayer />);

    // Check header
    expect(screen.getByRole("heading", { name: "Sermons", level: 3 })).toBeInTheDocument();
    expect(
      screen.getByText("Organize teaching videos and link them to passages.")
    ).toBeInTheDocument();

    // Check input
    expect(screen.getByLabelText("YouTube URL")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("https://youtu.be/...")).toBeInTheDocument();

    // Check preview section
    expect(screen.getByText("Preview title")).toBeInTheDocument();
    expect(screen.getByText("Channel name · 42 min")).toBeInTheDocument();

    // Check recent list
    expect(screen.getByRole("heading", { name: "Recent Sermons" })).toBeInTheDocument();
    expect(screen.getByText(/Romans 8:28/)).toBeInTheDocument();
    expect(screen.getByText("John 3 · “Born Again”")).toBeInTheDocument();

    // Check empty state
    // Note: Currently the component renders both recent items and the empty state message.
    expect(screen.getByText("No sermons saved yet.")).toBeInTheDocument();
  });

  it("allows typing in the URL input", async () => {
    const user = userEvent.setup();
    render(<SermonPlayer />);

    const input = screen.getByLabelText("YouTube URL");
    await user.type(input, "https://youtube.com/watch?v=123");

    expect(input).toHaveValue("https://youtube.com/watch?v=123");
  });
});
