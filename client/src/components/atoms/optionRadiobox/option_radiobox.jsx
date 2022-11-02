import React, { useState } from 'react';
// 사용하려면 수정 필요
// option.jsx 참고
// 스타일 참고를 위해, 파일 자체는 남겨둠
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
