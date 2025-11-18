import { render, screen } from "@testing-library/react";

import { TestFirst } from "../TestFirst";

describe("First Test", () => {
  test("First test", () => {
    render(<TestFirst />);

    expect(true).toBeTruthy();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
