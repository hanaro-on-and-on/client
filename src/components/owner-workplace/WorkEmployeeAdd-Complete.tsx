import { useState } from 'react';
import { VStack } from '../ui/Stack';

import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const WorkEmployeeAddComplete = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();

  const onClickConfirm = () => {
    navigate(`/owner`);
  };

  return (
    <VStack className='p-6 h-full'>
      <VStack className='m-auto gap-3 items-center'>
        <FaCheckCircle className='text-8xl text-hanaLightGreen' />
        <div className='text-center text-2xl'>직원을</div>
        <div className='text-center text-2xl'> 등록했어요 👍</div>
      </VStack>

      <button
        onClick={onClickConfirm}
        className='bg-hanaLightGreen rounded-md min-w-full text-white font-semibold h-[45px] text-center'
      >
        확인
      </button>
    </VStack>
  );
};
export default WorkEmployeeAddComplete;
