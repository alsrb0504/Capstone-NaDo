import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useMove from '../../../hooks/useMove';
import { SelectCoffee } from '../../../store/features/order';
import MenuCard from '../../atoms/cards/menuCard/menu_card';

const StoreMenuSection = ({ menuList }) => {
  const dispatch = useDispatch();
  const { HandleMove } = useMove();

  const MoveOption = useCallback(
    () => HandleMove('/order/option'),
    [HandleMove],
  );

  const ClickMenu = (menu) => {
    dispatch(SelectCoffee(menu));

    MoveOption();
  };

  return (
    <section className="store-menu-section">
      <h3 className="store-menu-title">메뉴</h3>
      <ul className="store-menu-container">
        {menuList &&
          menuList.map((menu) => (
            <MenuCard
              key={menu.sequence}
              menuInfo={menu}
              handleClick={ClickMenu}
            />
          ))}
      </ul>
    </section>
  );
};

export default StoreMenuSection;
