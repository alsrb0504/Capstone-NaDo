import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import LineInput from '../../atoms/inputs/lineInput/line_input';

const LineInputContainer = ({
  desc,
  id,
  condition,
  type,
  register,
  errors,
}) => (
  <div className="line-input-container">
    <LineInput
      desc={desc}
      condition={condition}
      id={id}
      type={type}
      register={register}
    />
    <ErrorMessage
      errors={errors}
      name="nickname"
      as="p"
      className="line-input-error is-margin-bottom"
    />
  </div>
);

export default LineInputContainer;
