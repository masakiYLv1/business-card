import { render, screen } from "@testing-library/react";
import { Provider } from "../ui/provider";
import userEvent from "@testing-library/user-event";

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

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "test-id" }),
  useNavigate: () => mockNavigate,
}));

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

  test("自己紹介が表示されている", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Card />
        </BrowserRouter>
      </Provider>
    );

    const introduction = await screen.findByRole("heading", {
      name: "自己紹介",
    });
    expect(introduction).toHaveTextContent("自己紹介");

    const description = await screen.findByText("テスト太郎の自己紹介");
    expect(description).toHaveTextContent("テスト太郎の自己紹介");
  });

  test("技術が表示されている", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Card />
        </BrowserRouter>
      </Provider>
    );

    const skill = await screen.findByText("React");
    expect(skill).toHaveTextContent("React");
  });

  test("Githubアイコンが表示されている", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Card />
        </BrowserRouter>
      </Provider>
    );

    const github = await screen.findByLabelText("GitHub");
    expect(github).toBeInTheDocument();
  });

  test("Qiitaのアイコンが表示されている", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Card />
        </BrowserRouter>
      </Provider>
    );

    const qiita = await screen.findByLabelText("Qiita");
    expect(qiita).toBeInTheDocument();
  });

  test("Twitterのアイコンが表示されている", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Card />
        </BrowserRouter>
      </Provider>
    );

    const x = await screen.findByLabelText("X");
    expect(x).toBeInTheDocument();
  });

  test("戻るボタンをクリックすると/に遷移する", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Card />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    const backButton = await screen.findByRole("button", { name: "戻る" });
    await user.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
