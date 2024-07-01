import clsx from 'clsx';
import { ReactNode } from 'react';

type Prop = {
  title?: string;
  className?: string;
  children: ReactNode;
  button?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
};

const Wrapper = ({
  children,
  className,
  buttonText,
  onButtonClick,
  button = false,
  title = '',
}: Prop) => {
  return (
    <>
      <div className={clsx('w-full flex flex-col', className)}>
        <div className='flex justify-between'>
          {title && <div className='font-bold mb-3 text-start'>{title}</div>}
          {button && (
            <button
              type='button'
              onClick={onButtonClick}
              className='rounded-3xl underline-offset-1 underline text-gray-500 px-2 h-[23px] bg-transparent text-sm'
            >
              {buttonText}
            </button>
          )}
        </div>

        {children}
      </div>
    </>
  );
};

export default Wrapper;
