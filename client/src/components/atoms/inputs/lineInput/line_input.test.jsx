const { render, screen } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const { default: LineInput } = require('./line_input');

describe('라인 인풋', () => {
  let inputComponent;
  let desc;
  let val;
  let name;

  beforeEach(() => {
    desc = '비밀번호';
    name = 'password_2';
  });

  it('입력할 수 있는 인풋 테스트', () => {
    inputComponent = <LineInput desc={desc} name={name} />;

    render(inputComponent);
    const input = screen.getByPlaceholderText(desc);

    userEvent.type(input, '비밀번호');

    expect(input.value).toBe('비밀번호');
  });

  it('입력할 수 없는 인풋 테스트', () => {
    val = 'fixed';
    inputComponent = <LineInput desc={desc} name={name} val={val} />;

    render(inputComponent);
    const input = screen.getByPlaceholderText(desc);

    userEvent.type(input, '값 변경');

    expect(input.disabled).toBeTruthy();
    expect(input.value).toBe('fixed');
  });
});
