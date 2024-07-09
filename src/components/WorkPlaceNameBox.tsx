import clsx from 'clsx';
import PulseWorkPlaceName from './ui/PulseWorkPlaceName';
import WorkPlaceName from './ui/WorkPlaceName';
import { ReactNode } from 'react';
import { FaAngleRight } from 'react-icons/fa6';

type Prop = {
  workPlaceName: string | undefined;
  colorType: string | undefined;
  onClick?: () => void;
  center?: boolean;
  hover?: boolean;
  arrow?: boolean;
  arrowText?: string;
  className?: string;
  children?: ReactNode | string;
};
const WorkPlaceNameBox = ({
  workPlaceName,
  colorType,
  onClick = () => {},
  className = '',
  center = false,
  arrow = false,
  arrowText = '',
  children,
}: Prop) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        `flex flex-col bg-white w-full rounded-lg border border-gray-200 ${className}`
      )}
    >
      <div
        className={clsx('flex py-5 px-5 justify-between items-center w-full', {
          'justify-center': center,
        })}
      >
        <div className='flex flex-col gap-1 justify-center'>
          {/* 매장명 */}
          {workPlaceName !== undefined && colorType ? (
            <WorkPlaceName name={workPlaceName} colorType={colorType} />
          ) : (
            <PulseWorkPlaceName />
          )}
          {children && <div>{children}</div>}
        </div>

        {arrow && (
          <div className='flex items-center gap-2 justify-end'>
            {arrowText}
            <FaAngleRight />
          </div>
        )}
      </div>
    </button>
  );
};

export default WorkPlaceNameBox;

{
  /* <WhiteBox border className='hover:bg-[#f2ebf2]'>
  
</WhiteBox>; */
}
