import { FaAngleDown } from 'react-icons/fa6';
import WorkPlaceName from '../ui/WorkPlaceName';
import SelectBox from './SelectBox';
import { useState } from 'react';

type SelectProps = {
  options: [];
};

const Select = ({ options }: SelectProps) => {
  const [selected, setSelected] = useState({
    workPlaceId: 1, // Long
    workPlaceNm: '롯데리아 자양점',
    workPlaceColor: '01', // String
    workPlaceEmployeeId: 1, // Long
    employeeNm: '이신광', // String
  });
  const [showList, setShowList] = useState(false);

  const onClickSelect = (data) => {
    setSelected(data);
  };

  return (
    <div className='w-full'>
      <button
        className='w-full bg-white border-b border-b-hanaLightGreen flex flex-row gap-2 justify-between items-center'
        onClick={() => setShowList(!showList)}
      >
        <div className='w-1/2 px-1 py-2'>
          <WorkPlaceName
            name={selected.workPlaceNm}
            colorType={selected.workPlaceColor}
          />
        </div>
        <div className='w-1/2'>{selected.employeeNm}</div>
        <FaAngleDown />
      </button>
      <SelectBox
        isOpen={showList}
        options={options}
        onClose={() => setShowList(false)}
        onClick={onClickSelect}
      />
    </div>
  );
};

export default Select;
