import { render, screen } from "@testing-library/react";

import App from "../App";

describe("business-card tests", () => {
  test("Vite + Reactが表示されている", () => {
    render(<App />);
    expect(true).toBeTruthy();

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Vite + React");
  });
});
