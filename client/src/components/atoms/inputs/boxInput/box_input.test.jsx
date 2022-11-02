import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Boxinput from "./box_input";

describe("박스 인풋", () => {
  let inputComponent;
  let desc;

  beforeEach(() => {
    desc = "닉네임";
    inputComponent = <Boxinput desc={desc} />;
  });

  it("props 전달 성공", () => {
    render(inputComponent);
    const label = screen.getByText(desc);
    const input = screen.getByPlaceholderText(`${desc}을 입력하세요.`);

    expect(label.innerHTML).toBe(desc);
    expect(input.name).toBe(desc);
  });

  it("값 입력 성공", () => {
    render(inputComponent);
    const input = screen.getByPlaceholderText(`${desc}을 입력하세요.`);

    userEvent.type(input, "테스트");
    expect(input.value).toBe("테스트");
  });
});
