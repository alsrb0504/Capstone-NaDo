import React from 'react';

const StateBox = ({ text, color }) => (
    <div className={`state-box state-box-${color}`}>
      <text>{text}</text>
    </div>
);

export default StateBox;
