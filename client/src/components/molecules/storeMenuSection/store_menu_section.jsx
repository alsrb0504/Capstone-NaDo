import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectCoffee } from '../../../store/features/order';
import MenuCard from '../../atoms/menuCard/menu_card';

const StoreMenuSection = ({ menuLists }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const MoveOption = () => navigate('/order/option');

  const ClickMenu = (menu) => {
    dispatch(SelectCoffee(menu));

    MoveOption();
  };

  return (
    <section className="store-menu-section">
      <h3 className="store-menu-title">메뉴</h3>
      <ul className="store-menu-container">
        {menuLists &&
          Object.keys(menuLists).map((menuName) => (
            <MenuCard
              key={menuName}
              menuInfo={menuLists[menuName]}
              handleClick={ClickMenu}
            />
          ))}
      </ul>
    </section>
  );
};

export default StoreMenuSection;