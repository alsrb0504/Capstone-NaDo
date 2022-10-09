import "./App.scss";
// import TestBtn from "../components/atoms/testBtn/testBtn";
import Boxinput from "../components/atoms/boxInput/box_input";
import LineInput from "../components/atoms/lineInput/line_input";
import RecordCard from "../components/atoms/recordCard/record_card";
import OrderStoreCard from "../components/atoms/orderStoreCard/order_store_card";
import PickupStoreCard from "../components/atoms/pickupStoreCard/pickup_store_card";
import PickingCard from "../components/atoms/pickingCard/picking_card";
import OrderingCard from "../components/atoms/orderingCard/ordering_card";
import OrderCompleteCard from "../components/atoms/orderCompleteCard/order_complete_card";
import PickupReadyCard from "../components/atoms/pickupReadCard/pickup_ready_card";
import Btn from "../components/atoms/btn/btn";
import BtnProfile from "../components/atoms/btnProfile/btn_profile";

import axios from 'axios';
import {useState, useEffect} from 'react';
import BtnOrder from "../components/atoms/btnOrder/btn_order";
import BtnPickup from "../components/atoms/btnPickup/btn_pickup";


const App = () => {

  const [test, setTest] = useState("loading...")

  useEffect(() => {
      (async () =>{
        const res = await axios.get("http://localhost:3001/", {
        withCredentials: true
      })

      setTest(res.data)
    })()
  }, [])
  const testFunc = () => {
    console.log("test");
  };

  return (
    <div className="App">
      {test}
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

          <Btn  
            text="피커와 채팅하기"
          />

          <Btn
            color="red"
            text="신고하기"
          />

          <Btn
            color="blue"
            text="배달 완료 확인"
          />

          <BtnProfile
            text="프로필 수정"
          />

          <BtnOrder
          />

          <BtnPickup
          />
        </div>
      </div>
    </div>
  );
};

export default App;
