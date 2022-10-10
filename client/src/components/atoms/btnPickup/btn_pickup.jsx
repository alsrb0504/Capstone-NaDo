import React from "react";

const BtnPickup = ({ handleClick }) => {

    const OnClick = () => {
        handleClick();
    };

    return(
        <button className="btn-pickup" onClick={OnClick}>
            <img className="icon" src="images/pickup.svg" alt="pickup"/>
            <span className="name">픽업하기</span>
        </button>
    );
};

export default BtnPickup;