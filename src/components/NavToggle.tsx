import clsx from 'clsx';
import { useEffect, useState } from 'react';

type Prop = {
  first: string;
  second: string;
  firstSelected: () => void;
  secondSelected: () => void;
};

const NavToggle = ({ first, second, firstSelected, secondSelected }: Prop) => {
  const [selected, setSelected] = useState<string>(first);

  const selectPayment = () => {
    setSelected(first);
    firstSelected();
  };

  const selectWorktime = () => {
    setSelected(second);
    secondSelected();
  };

  useEffect(() => {
    console.log(selected);
  }, []);
  return (
    <>
      <div className='grid grid-cols-2 justify-between rounded-xl bg-gray-300 w-[80%] h-[50px]'>
        <button
          onClick={selectPayment}
          className={clsx('col-span-1 bg-gray-300 rounded-xl  h-[50px]', {
            'bg-white font-semibold': selected === first,
          })}
        >
          {first}
        </button>
        <button
          onClick={selectWorktime}
          className={clsx('bg-gray-300 rounded-xl  h-[50px]', {
            'bg-white font-semibold': selected === second,
          })}
        >
          {second}
        </button>
        <div className='absolute rounded-xl bg-white  h-[50px]'></div>
      </div>
    </>
  );
};

export default NavToggle;
