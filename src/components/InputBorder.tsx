import clsx from 'clsx';
import { ForwardedRef, forwardRef, useState } from 'react';

type Prop = {
  title?: string;
  placeHolder?: string;
};

const InputBorder = forwardRef(
  (
    { title, placeHolder }: Prop,
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

          <input
            ref={ref}
            placeholder={placeHolder || ''}
            onFocus={handleFocused}
            onBlur={handleBlur}
            className={clsx(
              'w-full px-1 mt-4 border-b border-b-gray-300 focus:outline-none',
              {
                'border-b-hanaLightGreen': focused,
              }
            )}
          />
        </div>
      </>
    );
  }
);

InputBorder.displayName = 'InputBorder';

export default InputBorder;
