import clsx from 'clsx';
import PulseWorkPlaceName from './ui/PulseWorkPlaceName';
import WhiteBox from './ui/WhiteBox';
import WorkPlaceName from './ui/WorkPlaceName';
import { ReactNode } from 'react';
import { FaAngleRight } from 'react-icons/fa6';

type Prop = {
  workPlaceName: string | undefined;
  colorType: string | undefined;
  center?: boolean;
  hover?: boolean;
  arrow?: boolean;
  children?: ReactNode | string;
};
const HWorkPlaceNameBox = ({
  workPlaceName,
  colorType,
  children,
  center = false,
  arrow = false,
}: Prop) => {
  return (
    <WhiteBox border className='hover:bg-[#f2ebf2]'>
      <div
        className={clsx('flex py-5 justify-between items-center', {
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
    </WhiteBox>
  );
};

export default HWorkPlaceNameBox;
