import clsx from 'clsx';
import useToggle from '../hooks/toggle';

type Prop = {
  first: string;
  second: string;
};

const NavToggle = ({ first, second }: Prop) => {
  const { flag, toggle } = useToggle(false);
  return (
    <>
      <div className='relative rounded-xl bg-gray-300 w-[80%] h-[50px]'>
        <button
          onClick={() => toggle()}
          className={clsx('absolute rounded-xl bg-white w-[50%] h-[50px]', {
            'bg-white font-semibold': !flag,
          })}
        >
          {first}
        </button>
        <button
          className={clsx('absolute rounded-xl bg-white w-[50%] h-[50px]', {
            'bg-white font-semibold': !flag,
          })}
        >
          {second}
        </button>
        <div className='absolute rounded-xl bg-white w-[50%] h-[50px]'></div>
      </div>
    </>
  );
};

export default NavToggle;
