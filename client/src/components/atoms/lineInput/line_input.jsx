/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

const LineInput = ({ desc, id, val, register, condition }) => (
  <input
    {...register(id, {
      value: val,
      ...condition,
    })}
    id={id}
    className="line-input"
    type="text"
    placeholder={desc}
    disabled={!!val}
  />
);

export default LineInput;
