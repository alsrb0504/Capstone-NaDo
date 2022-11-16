/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/atoms/headers/header/header';
import OptionUnderline from '../../../components/atoms/optionUnderline/option_underline';
import TextUnderline from '../../../components/atoms/textUnderline/text_underline';
import Btn from '../../../components/atoms/buttons/btn/btn';
import { AddCart } from '../../../store/features/cart';

const OrderOption = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartStoreName } = useSelector((state) => state.cart);
  const { selectedStore, selectedMenu } = useSelector((state) => state.order);

  const { storeSequence, name } = selectedStore;
  const { sequence, menuName, menuPrice } = selectedMenu;

  // ice/hot 옵션
  const [icehot, setIcehot] = useState('ice');
  // shots 옵션
  const [shots, setShots] = useState(0);
  // count 수량 옵션
  const [count, setCount] = useState(1);
  // 총 가격
  const [totalPrice, setTotalPrice] = useState(menuPrice);

  // ice/hot 옵션 확인용, 추후 삭제
  const icehotChange = (e) => {
    setIcehot(e.target.value);
  };
  // shots 옵션 확인용, 추후 삭제
  const shotsChange = (e) => {
    setShots(Number(e.target.value));
  };

  // count 수량 옵션 증가
  const IncreaseCnt = () => {
    if (count < 8) setCount(count + 1);
  };
  // count 수량 옵션 감소
  const DecreaseCnt = () => {
    if (count > 1) setCount(count - 1);
  };

  const MoveBack = () => navigate('/order/store');

  const handleSubmit = () => {
    if (cartStoreName !== '' && cartStoreName !== name) {
      alert('장바구니에는 동일한 가게의 음료만 담을 수 있습니다.');
      return;
    }

    const menuInfo = {
      menuName,
      menuOptions: {
        icehot: 'ice',
        shots,
      },
      cnt: count,
      menuPrice,
      totalPrice,
      menuSequence: sequence,
    };

    dispatch(AddCart({ storeSequence, storeName: name, menuInfo }));

    // alert('장바구니에 담겼습니다! 추후 팝업으로 교체');
    Swal.fire({
      title: '장바구니에 담겼습니다!',
      text: '',
      icon: 'success',
      // confirmButtonColor: '#43a2ff',
      showConfirmButton: false,
      timer: 1200,
    });
    MoveBack();
  };

  useEffect(() => {
    const coffeePrice = menuPrice + shots * 500;
    setTotalPrice(count * coffeePrice);
  }, [count, menuPrice, shots]);

  return (
    <div className="option col-sm-4">
      <Header title={name} handleClick={MoveBack} />
      <div className="item-option-form">
        <TextUnderline text={menuName} />

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
              value={1}
              onChange={shotsChange}
              checked={shots === 1}
              className={shots === 1 ? 'checked' : 'none'}
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
              value={2}
              onChange={shotsChange}
              checked={shots === 2}
              className={shots === 2 ? 'checked' : 'none'}
            />
          </label>
        </div>

        <div className="count">
          <span className="title">수량 : </span>
          <button type="button" onClick={DecreaseCnt} className="button">
            <i className="fa-solid fa-minus" />
          </button>
          <div className="cnt-box">
            <span className="cnt">{count}</span>
          </div>
          <button type="button" onClick={IncreaseCnt} className="button">
            <i className="fa-solid fa-plus" />
          </button>
        </div>

        <div className="item-option-form-btn-complete">
          <Btn
            text={`${totalPrice}원 장바구니 담기`}
            handleClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderOption;
