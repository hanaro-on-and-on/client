import clsx from 'clsx';
import { getColor } from '../../utils/get-color';

type WorkPlaceNameProps = {
  name: string;
  colorType: string;
  textSmall?: boolean;
};

const WorkPlaceName = ({
  name,
  colorType,
  textSmall = false,
}: WorkPlaceNameProps) => {
  return (
    <span className='flex gap-2 items-center'>
      <span
        className={clsx(
          'rounded-full text-white font-semibold flex justify-center items-center w-[20px] h-[20px]',
          getColor(colorType),
          { 'w-[15px] h-[15px]': textSmall }
        )}
      ></span>
      <span
        className={clsx('line-clamp-1 w-[120px] text-start', {
          'text-sm': textSmall,
        })}
      >
        {name}
      </span>
    </span>
  );
};

export default WorkPlaceName;
