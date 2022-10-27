import React from 'react';
import MenuCard from '../../atoms/menuCard/menu_card';

const StoreMenuSection = ({ menuLists }) => {
  console.log(menuLists);

  return (
    <section className="store-menu-section">
      <h3 className="store-menu-title">메뉴</h3>
      <ul className="store-menu-container">
        {menuLists &&
          Object.keys(menuLists).map((menuName) => (
            <MenuCard key={menuName} menuInfo={menuLists[menuName]} />
          ))}
      </ul>
    </section>
  );
};

export default StoreMenuSection;
