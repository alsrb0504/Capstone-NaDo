import "./App.scss";
import TestBtn from "../components/atoms/testBtn/testBtn";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {/* 여기서 만든 버튼들 확인 */}
          <TestBtn callback={() => alert("click")} />
        </div>
      </div>
    </div>
  );
};

export default App;
