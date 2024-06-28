import { ReactNode } from 'react';
import Nav from './Nav';

type Prop = {
  children: ReactNode;
  navTitle: string;
};

const Frame = ({ children, navTitle }: Prop) => {
  return (
    <div className='static h-[100vh]'>
      <Nav title={navTitle} />
      <div className='flex flex-col items-center'>
        <div className='w-[90%] flex flex-col items-center '>{children}</div>
      </div>
    </div>
  );
};

export default Frame;
