import "./App.scss";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";
import Home from "../pages/home";
import AxiosSetting from "../services/axios";

const App = () => {
  useEffect(() => {
    // AxiosSetting();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

{
  /* <>
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

  <PickupStoreCard
    info={{
      name: "스타벅스",
      url: "https://cdn.pixabay.com/photo/2020/01/16/17/32/pokemon-4771238_960_720.jpg",
      orderCnt: 10,
      isOpen: true,
    }}
    handleClick={testFunc}
  />

  <PickingCard
    info={{
      place: "소프트웨어관 303호",
      date: "21.09.08 13:35",
      price: "8900",
      isOrder: true,
    }}
    handleClick={testFunc}
  />

  <OrderingCard
    info={{
      name: "스타벅스",
      options: ["샷 추가(+500원)"],
      price: 5900,
      cnt: 3,
    }}
    updateCount={testFunc}
  />

  <OrderCompleteCard
    info={{
      name: "스타벅스",
      options: ["샷 추가(+500원)"],
      price: 5900,
      cnt: 3,
    }}
  />

  <PickupReadyCard
    info={{
      place: "소프트웨어관 303호",
      date: "13 : 35",
      price: "8900",
    }}
  />
</>; */
}
