import clsx from 'clsx';
import { ForwardedRef, forwardRef, useState } from 'react';

type Prop = {
  title?: string;
  placeHolder?: string;
  type?: string;
  max?: number;
  min?: number;
  unit?: string;
};

const InputBorder = forwardRef(
  (
    { title, placeHolder, max, min, unit, type = 'text' }: Prop,
    ref: ForwardedRef<HTMLInputElement | null>
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
          <div className='flex justify-between items-end'>
            <input
              ref={ref}
              type={type}
              max={max || 0}
              min={min || 0}
              placeholder={placeHolder || ''}
              onFocus={handleFocused}
              onBlur={handleBlur}
              className={clsx(
                'w-[90%] px-1 mt-4 border-b border-b-gray-300 focus:outline-none',
                {
                  'border-b-hanaLightGreen': focused,
                  'w-full': !unit,
                }
              )}
            />
            {unit && <div className='pl-1 text-end'>{unit}</div>}
          </div>
        </div>
      </>
    );
  }
);

InputBorder.displayName = 'InputBorder';

export default InputBorder;
