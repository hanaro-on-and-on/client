import { useState } from 'react';
import ToolBarDetail from './ToolBarDetail';

const mockData = ['나의 사업장', '캘린더'];
const employeeData = ['캘린더', '알바관리', '마이페이지', '출퇴근'];

type ToolBarProps = {
  options?: string[];
  isEmployee?: boolean;
};

const ToolBar2 = ({ options = mockData, isEmployee = false }: ToolBarProps) => {
  const [selected, setSelected] = useState(0);
  const onClickSelect = (idx: number) => {
    setSelected(idx);
  };

  if (isEmployee) {
    options = employeeData;
  }

  return (
    <>
      <div className='relative flex justify-evenly min-h-12 items-center border-b border-gray-200 w-full'>
        {options.map((option, idx) => (
          <button
            key={option}
            className={`bg-transparent px-2 py-3 ${idx == selected ? 'border-b-2 border-hanaLightGreen' : ''}`}
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

export default ToolBar2;
