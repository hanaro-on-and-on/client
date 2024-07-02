import {
  ChangeEvent,
  InputHTMLAttributes,
  PropsWithChildren,
  useState,
} from 'react';
import { VStack } from './Stack';

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'UNDER_BAR' | 'BORDER';
  valueType?: 'NUMBER';
  label: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const getClassNameByType = (type: string) => {
  switch (type) {
    case 'UNDER_BAR':
      return 'border-b focus:border-b-2';
    case 'BORDER':
      return 'border rounded-lg px-2 py-1';
  }
};

const InputBox = (props: PropsWithChildren<InputBoxProps>) => {
  const {
    type = 'UNDER_BAR',
    valueType = 'NUMBER',
    label,
    value,
    onChange,
    children,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const onFocusHandle = () => setIsFocused(true);
  const onBlurHnadle = () => setIsFocused(false);

  return (
    <VStack
      className={`border-2 border-gray-300  focus-within:border-hanaLightGreen  rounded-xl p-5 shadow-lg gap-2 transition-all duration-300`}
    >
      <div
        className={`text-left font-bold ${isFocused ? 'text-lg' : 'text-md'}`}
      >
        {label}
      </div>
      <div>
        {children || (
          <input
            className={`w-full border-gray-300 ${getClassNameByType(type)} focus:outline-none focus:border-hanaLightGreen`}
            value={value}
            type={valueType}
            onChange={onChange}
            onFocus={onFocusHandle}
            onBlur={onBlurHnadle}
            {...rest}
          />
        )}
      </div>
    </VStack>
  );
};

export default InputBox;
