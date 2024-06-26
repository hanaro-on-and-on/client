import { ReactNode } from 'react';
import Nav from './nav';

type Prop = {
  children: ReactNode;
  navTitle: string;
};

const Wrapper = ({ children, navTitle }: Prop) => {
  return (
    <>
      <Nav title={navTitle} />
      <div className='flex flex-col items-center bg-pink-100 h-[100vh]'>
        <div className='bg-gray-200 w-[90%] flex flex-col items-center'>
          {children}
        </div>
      </div>
    </>
  );
};

export default Wrapper;
