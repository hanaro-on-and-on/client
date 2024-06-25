import { FaAngleLeft } from 'react-icons/fa6';

const Nav = () => {
  return (
    <>
      <div className='relative'>
        <div className='absolute'>
          <FaAngleLeft />
          밤바라밤
        </div>
        <div className=' w-full h-[100px] bg-pink-500 blur-sm opacity-35'></div>
      </div>
    </>
  );
};

export default Nav;
