import {InputProps} from '@ui-kitten/components';
import {useState} from 'react';

export const useInputState = (initialValue = ''): InputProps => {
  const [value, setValue] = useState(initialValue);
  return {value, onChangeText: setValue};
};
