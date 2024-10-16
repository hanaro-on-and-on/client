import clsx from 'clsx';
import { useEffect, useState } from 'react';

type Prop = {
  selectedTab: string;
  first: string;
  second: string;
  firstSelected: () => void;
  secondSelected: () => void;
};

const NavToggle = ({
  selectedTab,
  first,
  second,
  firstSelected,
  secondSelected,
}: Prop) => {
  const [selected, setSelected] = useState<string>(selectedTab);

  // 첫 항목 선택
  const selectPayment = () => {
    setSelected(first);
    firstSelected();
  };

  // 두 번째 항목 선택
  const selectWorktime = () => {
    setSelected(second);
    secondSelected();
  };

  useEffect(() => {
    setSelected(selectedTab);
  }, [selectedTab]);

  return (
    <>
      <div className='grid grid-cols-2 justify-between rounded-xl border border-gray-300 bg-gray-300 w-full h-[45px]'>
        {/* 첫 항목 */}
        <button
          onClick={selectPayment}
          className={clsx('col-span-1 bg-gray-300 rounded-xl  h-full', {
            'bg-white font-bold': selected === first,
          })}
        >
          {first}
        </button>

        {/* 두 번째 항목 */}
        <button
          onClick={selectWorktime}
          className={clsx('bg-gray-300 rounded-xl  h-full', {
            'bg-white font-bold': selected === second,
          })}
        >
          {second}
        </button>
      </div>
    </>
  );
};

export default NavToggle;
