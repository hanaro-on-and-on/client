import clsx from 'clsx';

type Prop = {
  textSmall?: boolean;
};
const PulseWorkPlaceName = ({ textSmall = false }: Prop) => {
  return (
    <span className='flex gap-2 items-center '>
      <span
        className={clsx(
          'rounded-full text-white font-semibold flex justify-center items-center w-[30px] h-[30px] bg-gray-100',
          { 'w-[15px] h-[15px]': textSmall }
        )}
      ></span>

      <span className='h-[10px] bg-gray-100 w-[120px]'></span>
    </span>
  );
};

export default PulseWorkPlaceName;
