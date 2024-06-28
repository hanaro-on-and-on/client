import clsx from 'clsx';
import { ReactNode } from 'react';

type Prop = {
  title?: string;
  className?: string;
  children: ReactNode;
};

const Wrapper = ({ children, className, title = '' }: Prop) => {
  return (
    <>
      <div className={clsx('w-full flex flex-col', className)}>
        {title && <div className='font-bold mb-3 text-start'>{title}</div>}
        {children}
      </div>
    </>
  );
};

export default Wrapper;
