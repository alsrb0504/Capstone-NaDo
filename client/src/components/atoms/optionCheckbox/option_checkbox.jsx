import React, { useState } from 'react';

const OptionCheckbox = ({ text }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
    <div className='option-checkbox'>
        <h3>{text}</h3>
        <label className='icon-box' htmlFor='checkbox1'>
            <input 
            type='checkbox' 
            id='checkbox1' 
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            className={isChecked ? "checked" : "none"}
            />
        </label>
    </div>
    );
};

export default OptionCheckbox;
