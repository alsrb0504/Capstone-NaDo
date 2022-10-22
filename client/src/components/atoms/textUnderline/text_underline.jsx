import React from 'react';

const TextUnderline = ({ text }) => (
    <div className='text-underline'>
        <div>
            <h3>{text}</h3>
            <div className="bar"/>
        </div>
    </div>
);

export default TextUnderline;
