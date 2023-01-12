import React from 'react';

const OptionUnderline = React.memo(({ text }) => (
  <div className="option-underline">
    <h3>{text}</h3>
  </div>
));

export default OptionUnderline;
