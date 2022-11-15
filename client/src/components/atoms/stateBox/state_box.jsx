import React from 'react';

const StateBox = ({ text, color }) => (
  <div className={`state-box state-box-${color}`}>
    <q>{text}</q>
  </div>
);

export default StateBox;
