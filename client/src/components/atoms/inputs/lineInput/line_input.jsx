/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

const LineInput = ({ desc, id, val, type, register, condition }) => (
  <input
    {...register(id, {
      value: val,
      ...condition,
    })}
    id={id}
    className="line-input"
    type={type || 'text'}
    placeholder={desc}
    disabled={!!val}
    autoComplete="on"
  />
);

export default LineInput;
