import { useState } from 'react';
import ToolBarDetail from './ToolBarDetail';

const mockData = ['나의 사업장', '캘린더'];

type ToolBarProps = {
  options?: string[];
};

const ToolBar = ({ options = mockData }: ToolBarProps) => {
  const [selected, setSelected] = useState(0);
  const onClickSelect = (idx: number) => {
    setSelected(idx);
  };

  return (
    <>
      <div className='flex justify-evenly min-h-12 items-center border-b border-gray-200'>
        {options.map((option, idx) => (
          <button
            key={option}
            className={`bg-white px-8 py-3 ${idx == selected ? 'border-b-2 border-hanaLightGreen' : ''}`}
            onClick={() => onClickSelect(idx)}
            disabled={selected == idx}
          >
            <ToolBarDetail title={option} isSelected={idx == selected} />
          </button>
        ))}
      </div>
    </>
  );
};

export default ToolBar;
