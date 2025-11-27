import { render, screen } from "@testing-library/react";
import { Provider } from "../ui/provider";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/Login";
import userEvent from "@testing-library/user-event";
import { Register } from "../../pages/Register";

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

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login tests", () => {
  test("タイトルが表示されている", () => {
    render(
      <Provider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const heading = screen.getByRole("heading", { name: "デジタル名刺アプリ" });

    expect(heading).toHaveTextContent("デジタル名刺アプリ");
  });

  test("IDを入力してボタンを押すと/cards/:idに遷移する", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: "名刺をみる" });
    const userId = screen.getByLabelText("ID");

    await user.type(userId, "test_id");
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/cards/test_id");
  });

  test("IDを入力しないでボタンを押すとエラーメッセージが表示される", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: "名刺をみる" });

    await user.click(button);

    const error = await screen.findByText("IDを入力してください");

    expect(error).toHaveTextContent("IDを入力してください");
  });

  test("新規登録はこちらを押すと/cards/registerに遷移する", async () => {
    render(
      <Provider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cards/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const user = userEvent.setup();

    const registerLink = screen.getByRole("link", { name: "新規登録はこちら" });

    expect(registerLink).toHaveAttribute("href", "/cards/register");

    await user.click(registerLink);

    const heading = await screen.getByRole("heading", { name: "新規名刺登録" });

    expect(heading).toHaveTextContent("新規名刺登録");
  });
});
