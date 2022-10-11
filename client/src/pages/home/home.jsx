import React from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/atoms/btn/btn";

const Home = (props) => {
  const navigate = useNavigate();

  const MoveTest = () => {
    navigate("/test/login");
  };

  return (
    <div>
      home
      <Btn color="red" text="테스트 로그인 페이지" handleClick={MoveTest}></Btn>
    </div>
  );
};

export default Home;
