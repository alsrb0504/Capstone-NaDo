import React from 'react';

const Boxinput = ({ desc }) => (
  <div className="box-input-container">
    <label htmlFor={desc}>{desc}</label>
    <input type="text" name={desc} placeholder={`${desc}을 입력하세요.`} />
  </div>
);

export default Boxinput;
