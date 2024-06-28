import { ReactNode } from 'react';

type Prop = {
  title?: string;
  children: ReactNode;
};

const Wrapper = ({ children, title = '' }: Prop) => {
  return (
    <>
      <div className='w-full flex flex-col'>
        {title && <div className='font-bold mb-3 text-start'>{title}</div>}
        {children}
      </div>
    </>
  );
};

export default Wrapper;
