import React from 'react';

const FormTitle = React.memo(({ title }) => (
  <h4 className="form-title">{title}</h4>
));

export default FormTitle;
