import { FaAngleLeft } from 'react-icons/fa6';

type Prop = {
  title: string;
};
const Nav = ({ title = '알바ON' }: Prop) => {
  return (
    <>
      <div className='relative flex flex-col justify-end h-[70px]'>
        <div className='absolute grid grid-cols-3 p-3 w-full'>
          <div className=' col-span-1'>
            <FaAngleLeft />
          </div>
          <div className='col-span-1'>{title}</div>
        </div>
        <div className=' w-full h-full bg-gray-200 opacity-35'></div>
      </div>
    </>
  );
};

export default Nav;
