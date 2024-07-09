import clsx from 'clsx';
import PulseWorkPlaceName from './ui/PulseWorkPlaceName';
import WhiteBox from './ui/WhiteBox';
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
  className?: string;
  children?: ReactNode | string;
};
const HWorkPlaceNameBox = ({
  workPlaceName,
  colorType,
  onClick = () => {},
  className = '',
  center = false,
  arrow = false,
  children,
}: Prop) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        `flex flex-col bg-white w-full rounded-xl border border-gray-200 ${className}`
      )}
    >
      <div
        className={clsx('flex py-5 px-5 justify-between items-center w-full', {
          'justify-center': center,
        })}
      >
        {/* 매장명 */}
        {workPlaceName !== undefined && colorType ? (
          <WorkPlaceName name={workPlaceName} colorType={colorType} />
        ) : (
          <PulseWorkPlaceName />
        )}
        <div className='flex justify-between items-center gap-1'>
          {children && <div>{children}</div>}
          {arrow && (
            <div className='flex items-center justify-end'>
              <FaAngleRight />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default HWorkPlaceNameBox;
