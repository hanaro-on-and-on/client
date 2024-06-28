import { ReactNode } from 'react';
import Nav from './Nav';

type Prop = {
  children: ReactNode;
  navTitle?: string;
  option?: boolean;
};

const Frame = ({ children, navTitle = '알바ON', option = true }: Prop) => {
  return (
    <div className='h-[100vh]'>
      {option && <Nav title={navTitle} />}
      <div
        className='flex flex-col items-center overflow-y-scroll'
        style={{ height: 'calc(100vh - 60px)' }}
      >
        <div className='w-[90%] h-full flex flex-col items-center '>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Frame;
