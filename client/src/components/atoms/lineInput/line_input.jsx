/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

const LineInput = ({ desc, id, val, register, condition }) => {
  console.log();

  return (
    <input
      {...register(id, {
        value: val,
        ...condition,
      })}
      id={id}
      className="line-input"
      type="text"
      placeholder={desc}
      // value={val}
      disabled={!!val}
    />
  );
};

// (
//   <input
//     {...register(id)}
//     id={id}
//     className="line-input"
//     type="text"
//     placeholder={desc}
//     value={val}
//     disabled={!!val}
//   />
// );
export default LineInput;
