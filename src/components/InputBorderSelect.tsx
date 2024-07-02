import clsx from 'clsx';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';

type SelectionProp = {
  text: string;
  value: any;
};

type Prop = {
  title?: string;
  defaultValue?: any;
  selectionList?: SelectionProp[];
};

const InputBorderSelect = forwardRef(
  (
    { title, defaultValue, selectionList }: Prop,
    ref: ForwardedRef<HTMLSelectElement | null>
  ) => {
    const [focused, setFocused] = useState<boolean>(false);

    const handleFocused = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    return (
      <>
        <div
          className={clsx(
            'bg-white py-5 px-7 rounded-xl',
            'border border-gray-300',
            {
              'border-hanaLightGreen': focused,
            }
          )}
        >
          <div className='font-bold text-start'>{title}</div>
          <select
            ref={ref}
            onFocus={handleFocused}
            onBlur={handleBlur}
            className={clsx(
              'w-full px-1 mt-4 border-b border-b-gray-300 focus:outline-none',
              {
                'border-b-hanaLightGreen': focused,
              }
            )}
          >
            {selectionList?.map((item) => (
              <option
                key={item.text}
                defaultChecked={
                  item.value === defaultValue || item.text === defaultValue
                }
              >
                {item.text}
              </option>
            ))}
            <option></option>
          </select>
        </div>
      </>
    );
  }
);

InputBorderSelect.displayName = 'InputBorderSelect';

export default InputBorderSelect;
