import { render, screen } from "@testing-library/react";
import ReadingPlan from "../components/ReadingPlan";

describe("ReadingPlan", () => {
  it("renders the starter plan card", () => {
    render(<ReadingPlan />);

    expect(
      screen.getByRole("heading", { name: "Reading Plans" })
    ).toBeInTheDocument();
    expect(screen.getByText("Bible in a Year")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start Plan" })).toBeInTheDocument();
  });
});
