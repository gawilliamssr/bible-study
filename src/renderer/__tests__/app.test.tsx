import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "../App";

// Mock ForceGraph2D as it uses Canvas which is not supported in jsdom
vi.mock("react-force-graph-2d", () => ({
  default: () => <div data-testid="force-graph">ForceGraph2D</div>,
}));

describe("App navigation", () => {
  it("switches between core views", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { name: "Reading" })).toBeInTheDocument();
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

    await user.click(screen.getByRole("button", { name: "Graph" }));
    expect(screen.getByRole("heading", { name: "Knowledge Graph", level: 2 })).toBeInTheDocument();
  });
});
