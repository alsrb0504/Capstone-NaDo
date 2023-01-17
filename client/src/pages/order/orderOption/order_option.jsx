import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/atoms/headers/header/header';
import OptionUnderline from '../../../components/atoms/optionUnderline/option_underline';
import TextUnderline from '../../../components/atoms/textUnderline/text_underline';
import Btn from '../../../components/atoms/buttons/btn/btn';
import { AddCart } from '../../../store/features/cart';
import { SwalSuccess } from '../../../utils/swal';
import useMove from '../../../hooks/useMove';

const OrderOption = () => {
  const { MoveBack } = useMove();
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

  // ice/hot 옵션 변경 함수
  const icehotChange = useCallback((e) => {
    setIcehot(e.target.value);
  }, []);

  // shots 옵션 변경 함수
  // 0: 미선택, 1: 한 샷 추가, 2: 두 샷 ...
  const shotsChange = useCallback((e) => {
    const shotCnt = Number(e.target.value);
    setShots((curShotCnt) => (curShotCnt === shotCnt ? 0 : shotCnt));
  }, []);

  // count 수량 변경 함수
  const IncreaseCnt = useCallback(() => {
    setCount((curCnt) => (curCnt + 1 < 9 ? curCnt + 1 : curCnt));
  }, []);
  const DecreaseCnt = useCallback(() => {
    setCount((curCnt) => (curCnt > 1 ? curCnt - 1 : curCnt));
  }, []);

  const handleSubmit = () => {
    if (cartStoreName !== '' && cartStoreName !== name) {
      alert('장바구니에는 동일한 가게의 음료만 담을 수 있습니다.');
      return;
    }

    const menuInfo = {
      menuName,
      menuOptions: {
        icehot,
        shots,
      },
      cnt: count,
      menuPrice,
      totalPrice,
      menuSequence: sequence,
    };

    dispatch(AddCart({ storeSequence, storeName: name, menuInfo }));
    SwalSuccess('장바구니에 담겼습니다!');

    setTimeout(() => {
      MoveBack();
    }, 1200);
  };

  useEffect(() => {
    const coffeePrice = menuPrice + shots * 500;
    setTotalPrice(count * coffeePrice);
  }, [count, menuPrice, shots]);

  return (
    <div className="option col-sm-4">
      <Header title={name} HandleClick={MoveBack} />
      <div className="item-option-form">
        <section className="item-option-form-inputs">
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
                readOnly
                checked={shots === 1}
                onClick={(e) => shotsChange(e)}
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
                readOnly
                checked={shots === 2}
                onClick={(e) => shotsChange(e)}
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
        </section>

        <div className="item-option-form-btn-complete">
          <Btn
            text={`${totalPrice}원 장바구니 담기`}
            HandleClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderOption;
