import { FaAngleDown } from 'react-icons/fa6';
import WorkPlaceName from '../ui/WorkPlaceName';
import SelectBox from './SelectBox';
import { useState } from 'react';

type optionView = {
  workPlaceId: number;
  workPlaceNm: string;
  workPlaceColor: string;
  workPlaceEmployeeId: number;
  employeeNm: string;
};
type SelectProps = {
  options: optionView[];
  selectedId: number;
  onSelect: (id: number) => void;
};

const filteredData = (options: optionView[], selectedId: number) => {
  return options.find((e) => e.workPlaceEmployeeId === selectedId);
};

const Select = ({ options, selectedId, onSelect }: SelectProps) => {
  const [showList, setShowList] = useState(false);
  const selected = filteredData(options, selectedId);

  return (
    <div className='w-full'>
      <button
        className='w-full bg-white border-b border-b-hanaLightGreen flex flex-row gap-2 justify-between items-center'
        onClick={() => setShowList(!showList)}
      >
        <div className='w-1/2 px-1 py-2'>
          <WorkPlaceName
            name={selected!.workPlaceNm}
            colorType={selected!.workPlaceColor}
          />
        </div>
        <div className='w-1/2 font-bold'>{selected!.employeeNm}</div>
        <FaAngleDown />
      </button>
      <SelectBox
        isOpen={showList}
        options={options}
        onClose={() => setShowList(false)}
        onClick={onSelect}
      />
    </div>
  );
};

export default Select;
