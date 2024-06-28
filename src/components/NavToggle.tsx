import clsx from 'clsx';
import { useState } from 'react';

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

  return (
    <>
      <div className='relative rounded-xl bg-gray-300 w-[80%] h-[50px]'>
        <button
          onClick={selectPayment}
          className={clsx('absolute rounded-xl bg-white w-[50%] h-[50px]', {
            'bg-white font-semibold': selected === first,
          })}
        >
          {first}
        </button>
        <button
          onClick={selectWorktime}
          className={clsx('absolute rounded-xl bg-white w-[50%] h-[50px]', {
            'bg-white font-semibold': selected === second,
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
