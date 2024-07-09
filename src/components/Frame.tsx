import { ReactNode } from 'react';
import ToolBarLink from './ui/ToolBarLink';
import { EmployeeMenuList } from '../pages/employee/datas';
import Footer from './Footer';
import Nav from './Nav';

type Prop = {
  children: ReactNode;
  navTitle?: string;
  option?: boolean;
  toolBar?: boolean;
  footer?: boolean;
  toolBarOption?: LinkData[];
};

const Frame = ({
  children,
  navTitle = '알바ON',
  option = true,
  toolBar = false,
  footer = false,
  toolBarOption = [],
}: Prop) => {
  return (
    <div className='h-[100vh]'>
      {option && <Nav title={navTitle} />}
      {toolBar && (
        <ToolBarLink
          options={toolBarOption.length > 0 ? toolBarOption : EmployeeMenuList}
        />
      )}
      <div
        className='flex flex-col items-center overflow-y-scroll '
        style={{
          height: !toolBar ? 'calc(100vh - 60px)' : 'calc(100vh - 110px)',
        }}
      >
        <div className='flex-grow flex flex-col items-center w-full  '>
          <div className='flex-grow min-h-[90%] w-[90%] pt-5 pb-10 '>
            {children}
          </div>
          {footer && <Footer />}
        </div>
      </div>
    </div>
  );
};

export default Frame;
