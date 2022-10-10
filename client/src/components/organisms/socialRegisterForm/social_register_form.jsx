import React from "react";
import LineInput from "../../atoms/lineInput/line_input";

const SocialRegisterForm = ({ nickname, email }) => {
  return (
    <form action="">
      <LineInput desc="닉네임" name="닉네임" val={nickname} />
      <LineInput desc="이메일" name="이메일" val={email} />
    </form>
  );
};

export default SocialRegisterForm;
