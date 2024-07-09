import clsx from 'clsx';

type Prop = {
  textSmall?: boolean;
};
const PulseWorkPlaceName = ({ textSmall = false }: Prop) => {
  return (
    <span className='flex gap-2 items-center animate-pulse '>
      <span
        className={clsx(
          'animated-pulse rounded-full text-white font-semibold flex justify-center items-center w-[30px] h-[30px] bg-gray-100',
          { 'w-[15px] h-[15px]': textSmall }
        )}
      ></span>

      <span className='h-[10px] bg-gray-100 w-[120px] animate-pulse'></span>
    </span>
  );
};

export default PulseWorkPlaceName;
