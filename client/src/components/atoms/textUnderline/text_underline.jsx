import React from 'react';

const TextUnderline = React.memo(({ text }) => (
  <div className="text-underline">
    <div>
      <h3>{text}</h3>
      <div className="bar" />
    </div>
  </div>
));

export default TextUnderline;
