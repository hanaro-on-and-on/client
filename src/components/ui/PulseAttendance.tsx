import WhiteBox from './WhiteBox';

const PulseAttendance = () => {
  return (
    <WhiteBox border className='py-5 animated-pulse'>
      <div className='w-full flex flex-col gap-2 itmes-center justify-center'>
        <div className='flex justify-between items-center w-full'>
          <div className=' rounded-full h-[30px] w-[30px] bg-gray-100 animated-pulse'></div>
          <div className='w-[50%] h-[10px] bg-gray-50 animated-pulse'></div>
        </div>
        <div className='flex flex-col gap-3 justify-center items-end w-full mt-3'>
          <div className='w-[80%] h-[10px] bg-gray-50 animated-pulse'></div>
          <div className='w-[80%] h-[10px] bg-gray-50 animated-pulse'></div>
          <div className='w-[80%] h-[10px] bg-gray-50 animated-pulse'></div>
        </div>
      </div>
    </WhiteBox>
  );
};
export default PulseAttendance;
