// WorkPlaceName.tsx
import React from 'react';
import clsx from 'clsx';
import { getColor } from '../../utils/get-color';
import './WorkPlaceName.css'; // Import CSS file for styles

type WorkPlaceNameProps = {
  name: string;
  colorType: string;
  textSmall?: boolean;
};

const WorkPlaceName: React.FC<WorkPlaceNameProps> = ({
  name,
  colorType,
  textSmall = false,
}) => {
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
        className={clsx('line-clamp-1 w-[120px] text-start overflow-hidden', {
          'text-sm': textSmall,
        })}
      >
        <span className={clsx({ 'scroll-text': name.length > 14 })}>
          {name}
        </span>
      </span>
    </span>
  );
};

export default WorkPlaceName;
