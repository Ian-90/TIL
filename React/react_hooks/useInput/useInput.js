import React, { useState } from 'react';

export const useInput = (initialValue, validator) => {
  const [ value, setValue ] = useState(initialValue)
  const onChange = ({ target: { value }}) => {
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value)
    }

    if (willUpdate) {
      setValue(value)
    }
  }
  return { value, onChange }
}
