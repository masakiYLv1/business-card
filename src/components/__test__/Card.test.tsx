import { render, screen } from "@testing-library/react";
import { Provider } from "../ui/provider";

import { Card } from "../../pages/Card";
import { BrowserRouter } from "react-router-dom";
jest.mock("../../supabaseClient");

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("Card tests", () => {
  test("名前が表示されている", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Card />
        </BrowserRouter>
      </Provider>
    );

    const userName = await screen.findByRole("heading", { name: "テスト太郎" });
    expect(userName).toHaveTextContent("テスト太郎");
  });
});
