import { render, screen } from "@testing-library/react";
import { Provider } from "../ui/provider";
import { Register } from "../../pages/Register";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../../supabaseClient.ts", () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({
        data: [
          { id: 1, name: "React" },
          { id: 2, name: "TypeScript" },
          { id: 3, name: "Github" },
        ],
        error: null,
      }),
    }),
  },
}));

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

describe("Register tests", () => {
  test("タイトルが表示されていること", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    const heading = await screen.findByRole("heading", {
      name: "新規名刺登録",
    });
    expect(heading).toHaveTextContent("新規名刺登録");
  });

  // test("全項目入力して登録ボタンを押すと/に遷移する", async () => {
  //   render(
  //     <Provider>
  //       <BrowserRouter>
  //         <Register />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   const user = userEvent.setup();

  //   const userId = await screen.findByLabelText(/好きな英単語/);
  //   const name = await screen.findByLabelText(/お名前/);
  //   const description = await screen.findByLabelText(/自己紹介/);

  //   const skillsSelect = await screen.findByRole("combobox");
  //   await user.click(skillsSelect);

  //   const option = await screen.findByRole("option", { name: "React" });
  //   await user.click(option);

  //   await user.type(userId, "test_id");
  //   await user.type(name, "テスト太郎");
  //   await user.type(description, "テスト太郎の自己紹介");

  //   expect(userId).toHaveValue("test_id");
  //   expect(name).toHaveValue("テスト太郎");
  //   expect(description).toHaveValue("テスト太郎の自己紹介");
  //   expect(option).toHaveAttribute("aria-selected", "true");
  // });

  test("IDがないときにエラーメッセージがでる", async () => {
    render(
      <Provider>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();

    const submitButton = await screen.findByRole("button", { name: "登録" });

    await user.click(submitButton);

    const error = await screen.findByText("ID入力が必須の項目です");

    expect(error).toHaveTextContent("ID入力が必須の項目です");
  });
});
