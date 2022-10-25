import React, { useState } from 'react';

const OptionRadiobox = ({ text }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
    <div className='option-radiobox'>
        <h3>{text}</h3>
        <label className='icon-box' htmlFor='radiobox1'>
            <input 
            id='radiobox1'
            type='radio'  
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            className={isChecked ? "checked" : "none"}
            />
        </label>
    </div>
    );
};

export default OptionRadiobox;
