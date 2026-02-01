import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App navigation", () => {
  it("switches between core views", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { name: "Reading" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bible" })).toHaveClass("is-active");

    await user.click(screen.getByRole("button", { name: "Notes" }));
    expect(screen.getByRole("heading", { name: "Notes" })).toBeInTheDocument();
    expect(
      screen.getByText("Capture insights tied to passages or sermons.")
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sermons" }));
    expect(screen.getByRole("heading", { name: "Sermons" })).toBeInTheDocument();
    expect(
      screen.getByText("Organize teaching videos and link them to passages.")
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Plans" }));
    expect(screen.getByRole("heading", { name: "Plans" })).toBeInTheDocument();
    expect(
      screen.getByText("Stay on track with structured daily readings.")
    ).toBeInTheDocument();
  });
});
