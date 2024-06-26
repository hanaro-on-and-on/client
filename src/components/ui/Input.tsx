import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'UNDER_BAR';
}

const Input = (props: InputProps) => {
  const { type, ...rest } = props;

  return <input className='border-b-2 w-full' {...rest} />;
};

export default Input;
