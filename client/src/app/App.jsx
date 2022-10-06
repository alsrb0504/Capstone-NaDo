import "./App.scss";
// import TestBtn from "../components/atoms/testBtn/testBtn";
import Boxinput from "../components/atoms/boxInput/box_input";
import LineInput from "../components/atoms/lineInput/line_input";
import RecordCard from "../components/atoms/recordCard/record_card";
import OrderStoreCard from "../components/atoms/orderStoreCard/order_store_card";

const App = () => {
  const testFunc = () => {
    console.log("test");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {/* 여기서 만든 버튼들 확인 */}
          {/* <TestBtn callback={() => alert("click")} /> */}

          <Boxinput desc={"닉네임"} />

          <LineInput desc="비밀번호 확인" name="password2" />

          <LineInput desc="비밀번호 확인" name="password2" val="value" />

          <RecordCard
            info={{
              place: "소프트웨어관 303호",
              date: "21.09.08 13:35",
              price: "8900",
              isOrder: true,
            }}
          />

          <RecordCard
            info={{
              place: "소프트웨어관 303호",
              date: "21.09.08 13:35",
              price: "8900",
              isOrder: false,
            }}
          />

          <OrderStoreCard
            info={{
              name: "스타벅스",
              url: "https://cdn.pixabay.com/photo/2020/01/16/17/32/pokemon-4771238_960_720.jpg",
              isOpen: true,
            }}
            handleClick={testFunc}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
