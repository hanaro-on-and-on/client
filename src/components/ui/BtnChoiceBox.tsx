import { MouseEvent } from 'react';
import { HStack } from './Stack';

type BtnChoiceBoxProps = {
  actionName: string;
  closeName: string;
  onAction: (e: MouseEvent<HTMLButtonElement>) => void;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
};

const BtnChoiceBox = (props: BtnChoiceBoxProps) => {
  const { actionName, closeName, onAction, onClose } = props;
  return (
    <HStack className='gap-2 justify-between'>
      <button
        onClick={onClose}
        className='bg-gray-400 rounded-md w-1/4 text-white font-semibold h-[45px] text-center'
      >
        {closeName}
      </button>
      <button
        onClick={onAction}
        className='bg-hanaLightGreen rounded-md w-3/4 text-white font-semibold h-[45px] text-center'
      >
        {actionName}
      </button>
    </HStack>
  );
};
export default BtnChoiceBox;
