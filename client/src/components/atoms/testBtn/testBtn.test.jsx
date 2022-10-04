import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestBtn from "./testBtn";
import React from "react";

// describe
describe("테스트 버튼", () => {
  let callback;
  let testComponent;

  beforeEach(() => {
    callback = jest.fn();
    testComponent = <TestBtn callback={callback} />;
  });

  it("클릭 이벤트 발생", () => {
    render(testComponent);

    const button = screen.getByText("testBtn");
    userEvent.click(button);
    expect(callback).toBeCalledTimes(1);
  });
});
