import React from "react";


const Btn = ({ text, color, handleClick }) => {

    const OnClick = () => {
        handleClick();
    };

    if(color==="red"){
        return (
        <button className="btn-red col-sm-4"onClick={OnClick}>{text}</button>
    );
    }
    else if(color==="blue"){
        return (
        <button className="btn-blue col-sm-4"onClick={OnClick}>{text}</button>
    );
    }
    else if(color==null) {
        return (
            <button className="btn col-sm-4"onClick={OnClick}>{text}</button>
        );
    }

    
};

export default Btn;