import WhiteBox from './WhiteBox';

const PulseWorkPlace = () => {
  return (
    <>
      <WhiteBox border className='animated-pulse py-3'>
        <div className='flex justify-between items-center'>
          <div className='w-[30px] h-[30px] bg-gray-100 rounded-full animated-pulse'></div>
          <div className='w-full h-full flex flex-col gap-3  items-end justify-end'>
            <div className='bg-gray-100 w-[80%] h-[10px] animated-pulse'></div>
            <div className='bg-gray-100 w-[50%] h-[10px] animated-pulse'></div>
          </div>
        </div>
      </WhiteBox>
    </>
  );
};

export default PulseWorkPlace;
