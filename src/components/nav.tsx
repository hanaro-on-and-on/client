import { FaAngleLeft } from 'react-icons/fa6';

type Prop = {
  title?: string;
};
const Nav = ({ title = '알바ON' }: Prop) => {
  return (
    <>
      <div className='relative flex items-end w-full h-[60px] bg-white'>
        <div className='grid grid-cols-3 p-3 w-full'>
          <div className=' col-span-1'>
            <FaAngleLeft />
          </div>
          <div className='col-span-1'>{title}</div>
        </div>
      </div>
    </>
  );
};

export default Nav;
