import { HStack, VStack } from '../ui/Stack';
import WorkPlaceName from '../ui/WorkPlaceName';

const mockData = [
  {
    workPlaceId: 1, // Long
    workPlaceNm: '롯데리아 자양점',
    workPlaceColor: '01', // String
    workPlaceEmployeeId: 1, // Long
    employeeNm: '이신광', // String
  },
  {
    workPlaceId: 1, // Long
    workPlaceNm: '롯데리아 자양점',
    workPlaceColor: '01', // String
    workPlaceEmployeeId: 2, // Long
    employeeNm: '이서하', // String
  },
  {
    workPlaceId: 1, // Long
    workPlaceNm: '롯데리아 자양점',
    workPlaceColor: '01',
    workPlaceEmployeeId: 3, // Long
    employeeNm: '정연주', // String
  },
  {
    workPlaceId: 2, // Long
    workPlaceNm: '버거킹',
    workPlaceColor: '02', // String
    workPlaceEmployeeId: 4, // Long
    employeeNm: '고영우', // String
  },
  {
    workPlaceId: 2, // Long
    workPlaceNm: '버거킹',
    workPlaceColor: '02', // String
    workPlaceEmployeeId: 5, // Long
    employeeNm: '최은진', // String
  },
];

type SelectBoxProps = {
  isOpen: boolean;
  options: {
    workPlaceEmployeeId: number;
    workPlaceName: string;
    colorTypeCode: string;
    employeeName: string;
  }[];
  onClose: () => void;
  onClick: (id: number) => void;
};

const SelectBox = ({ isOpen, options, onClose, onClick }: SelectBoxProps) => {
  if (!isOpen) return null;

  return (
    <div className='w-full h-full border rounded-b-xl'>
      <VStack className='h-40 overflow-scroll '>
        {options.map((data) => (
          <button
            key={data.workPlaceEmployeeId}
            onClick={() => {
              onClick(data.workPlaceEmployeeId);
              onClose();
            }}
            className='bg-white'
          >
            <HStack className='items-center justify-between'>
              <div className='w-1/2 p-2'>
                <WorkPlaceName
                  name={data.workPlaceName}
                  colorType={data.colorTypeCode}
                />
              </div>
              <div className='w-1/2'>{data.employeeName}</div>
            </HStack>
          </button>
        ))}
      </VStack>
    </div>
  );
};

export default SelectBox;
