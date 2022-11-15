export const IdCond = {
  // require: '아이디는 4자 이상 입력해주세요',
  required: '아이디를 입력해주세요',
  minLength: {
    value: 4,
    message: '아이디는 4자 이상 입력해주세요',
  },
  maxLength: {
    value: 16,
    message: '아이디는 16자 이하로 입력해주세요',
  },
  pattern: {
    // 추후 영어 포함하는 방법 물어보기
    value: /^[a-zA-Z0-9]*$/,
    message: '0~9 사이의 숫자와 알파벳만 가능합니다.',
  },
};

export const PasswdCond = {
  required: '비밀번호를 입력해주세요',
  minLength: {
    value: 4,
    message: '비밀번호는 4자 이상 입력해주세요',
  },
  maxLength: {
    value: 16,
    message: '비밀번호은 16자 이하로 입력해주세요',
  },
};

export const NicknameCond = {
  required: '닉네임를 입력해주세요',
  minLength: {
    value: 2,
    message: '닉네임는 2자 이상 입력해주세요',
  },
  maxLength: {
    value: 12,
    message: '닉네임은 12자 이하로 입력해주세요',
  },
};
