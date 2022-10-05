import "./App.scss";
import TestBtn from "../components/atoms/testBtn/testBtn";
import Boxinput from "../components/atoms/boxInput/box_input";
import LineInput from "../components/atoms/lineInput/line_input";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {/* 여기서 만든 버튼들 확인 */}
          <TestBtn callback={() => alert("click")} />

          <Boxinput desc={"닉네임"} />

          <LineInput desc="비밀번호 확인" name="password2" />

          <LineInput desc="비밀번호 확인" name="password2" val="value" />
        </div>
      </div>
    </div>
  );
};

export default App;
