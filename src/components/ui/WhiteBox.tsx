import clsx from 'clsx';
import { ReactNode } from 'react';

type Prop = {
  border?: boolean;
  dropShadow?: boolean;
  className?: string;
  title?: string;
  children: ReactNode;
  onClick?: () => void;
};

const WhiteBox = ({
  children,
  className = '',
  title = '',
  border = false,
  dropShadow = false,
}: Prop) => {
  return (
    <>
      <div
        className={clsx(`flex flex-col bg-white px-5 rounded-lg ${className}`, {
          'border border-gray-200': border,
          'drop-shadow-sm': dropShadow,
        })}
      >
        {title && <div className='font-semibold text-left'>{title}</div>}
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
};

export default WhiteBox;
