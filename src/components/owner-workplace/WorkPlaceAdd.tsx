/* eslint-disable jsx-a11y/label-has-associated-control */
import DatePicker from 'react-datepicker';
import Nav from '../Nav';
import InputBox from '../ui/InputBox';
import { HStack, Spacer, VStack } from '../ui/Stack';
import { FaAngleDown } from 'react-icons/fa6';
import { useState } from 'react';
import '../../styles/custom.css';

// type CustomInputProps = {
//   value?: string;
//   onClick?: () => void;
// };

// const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
//   ({ value, onClick }, ref) => (
//     <input
//       id='startDate'
//       type='text'
//       className='w-full cursor-pointer focus:outline-none'
//       onClick={onClick}
//       ref={ref}
//       value={value}
//       readOnly
//     />
//   )
// );
// CustomInput.displayName = 'CustomInput';

const WorkPlaceAdd = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div style={{ height: '90vh' }}>
      <Nav title='사장님 ON'></Nav>

      <VStack className='p-6 gap-7'>
        <VStack>
          <h2 className='text-2xl text-left font-bold'>사업자이신가요?</h2>
          <h3 className='text-left font-semibold text-gray-400'>
            사업자등록번호로 사업장을 등록할 수 있어요.
          </h3>
        </VStack>

        <VStack className='gap-5'>
          <InputBox
            label='사업자등록번호'
            // value={employeeNm}
            // onChange={onChangeEmployeeName}
            placeholder='- 없이 입력해주세요.'
          />

          <InputBox
            label='상호명'
            // value={employeeAddress}
            // onChange={onChangeEmployeeAddress}
            placeholder='정확한 상호명을 입력해주세요.'
          />

          <VStack
            className={`border-2 border-gray-300  focus-within:border-hanaLightGreen rounded-xl p-5 shadow-lg gap-2 transition-all duration-300`}
          >
            <label htmlFor='startDate' className='font-semibold text-left'>
              개업일
            </label>
            <HStack className='w-full border-b border-gray-300 items-baseline justify-between'>
              <DatePicker
                id='startDate'
                className='w-72 cursor-pointer focus:outline-none'
                // customInput={<CustomInput />}
                dateFormat='yyyy.MM.dd'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText='개업일 입력'
              />
              <label htmlFor='startDate'>
                <FaAngleDown className='text-end' />
              </label>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </div>
  );
};
export default WorkPlaceAdd;
