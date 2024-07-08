import {
  TbHexagonNumber1Filled,
  TbHexagonNumber2Filled,
  TbHexagonNumber3Filled,
} from 'react-icons/tb';
import { HStack } from './Stack';
import { MdHorizontalRule } from 'react-icons/md';

type ThreeLevelUiProps = {
  level: number;
};

const ThreeLevelUi = ({ level }: ThreeLevelUiProps) => {
  return (
    <HStack className='items-center align-middle justify-center'>
      <TbHexagonNumber1Filled
        className={`${level == 1 ? 'text-hanaLightGreen text-3xl' : 'text-gray-300 text-2xl'}`}
      />
      <MdHorizontalRule />
      <TbHexagonNumber2Filled
        className={`${level == 2 ? 'text-hanaLightGreen text-3xl' : 'text-gray-300 text-2xl'}`}
      />
      <MdHorizontalRule />
      <TbHexagonNumber3Filled
        className={`${level == 3 ? 'text-hanaLightGreen text-3xl' : 'text-gray-300 text-2xl'}`}
      />
    </HStack>
  );
};
export default ThreeLevelUi;
