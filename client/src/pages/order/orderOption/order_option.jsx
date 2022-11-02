import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/atoms/headers/header/header';
import OptionUnderline from '../../../components/atoms/optionUnderline/option_underline';
import TextUnderline from '../../../components/atoms/textUnderline/text_underline';
import Btn from '../../../components/atoms/buttons/btn/btn';

const OrderOption = () => {
  // 해야할 일
  // 뒤로가기 버튼 주소 다시 잡아주어야 함
  // 옵션, 수량에 따른 최종 가격 변동 넣어주어야함
  // 데이터 정리 및 변수명 정리
  // 주석 정리
  const navigate = useNavigate();

  const MoveBack = () => navigate('/');
  // 뒤로가기 버튼 주소 다시 잡아주어야 함

  const itemname = '녹차 라떼';
  const price = 5900;

  // ice/hot 옵션
  const [icehot, setIcehot] = useState('ice');
  // shots 옵션
  const [shots, setShots] = useState('');
  // count 수량 옵션
  const [count, setCount] = useState(1);

  // ice/hot 옵션 확인용, 추후 삭제
  const icehotChange = (e) => {
    console.log(e.target.value);
    setIcehot(e.target.value);
  };
  // shots 옵션 확인용, 추후 삭제
  const shotsChange = (e) => {
    console.log(e.target.value);
    setShots(e.target.value);
  };

  // count 수량 옵션 증가
  const Increase = () => {
    setCount(count + 1);
  };
  // count 수량 옵션 감소
  const Decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // 데이터 제출, 옵션 외에도 추가 필요
  // 상품명, 가격, 수량 등등...
  const handleSubmit = () => {
    const result = { icehot, shots, count };
    console.log(result);
  };

  return (
    <div className="option col-sm-4">
      <Header title="스타벅스" handleClick={MoveBack} />
      <form className="item-option-form" onSubmit={handleSubmit}>
        <TextUnderline text={itemname} />

        <OptionUnderline text="ICE / HOT" />

        <div className="option-radiobox">
          <h3>ICE</h3>
          <label className="icon-box" htmlFor="ice">
            <input
              type="radio"
              name="icehot"
              id="ice"
              value="ice"
              onChange={icehotChange}
              checked={icehot === 'ice'}
              className={icehot === 'ice' ? 'checked' : 'none'}
            />
          </label>
        </div>

        <div className="option-radiobox">
          <h3>HOT</h3>
          <label className="icon-box" htmlFor="hot">
            <input
              type="radio"
              name="icehot"
              id="hot"
              value="hot"
              onChange={icehotChange}
              checked={icehot === 'hot'}
              className={icehot === 'hot' ? 'checked' : 'none'}
            />
          </label>
        </div>

        <OptionUnderline text="에스프레소 샷 추가 (최대 1개)" />

        <div className="option-radiobox">
          <h3>1 샷 추가 (+500원)</h3>
          <label className="icon-box" htmlFor="shot1">
            <input
              type="radio"
              name="shots"
              id="shot1"
              value="shot1"
              onChange={shotsChange}
              checked={shots === 'shot1'}
              className={shots === 'shot1' ? 'checked' : 'none'}
            />
          </label>
        </div>

        <div className="option-radiobox">
          <h3>2 샷 추가 (+1000원)</h3>
          <label className="icon-box" htmlFor="shot2">
            <input
              type="radio"
              name="shots"
              id="shot2"
              value="shot2"
              onChange={shotsChange}
              checked={shots === 'shot2'}
              className={shots === 'shot2' ? 'checked' : 'none'}
            />
          </label>
        </div>

        <div className="count">
          <text className="title">수량 : </text>
          <button type="button" onClick={Decrease} className="button">
            <i className="fa-solid fa-minus" />
          </button>
          <div className="cnt-box">
            <text className="cnt">{count}</text>
          </div>
          <button type="button" onClick={Increase} className="button">
            <i className="fa-solid fa-plus" />
          </button>
        </div>

        <div className="item-option-form-btn-complete">
          <Btn text={`${price}원 장바구니 담기`} />
          {/* 옵션과 수량에 따라 가격 변동 되도록 하기 */}
        </div>
      </form>
    </div>
  );
};

export default OrderOption;
