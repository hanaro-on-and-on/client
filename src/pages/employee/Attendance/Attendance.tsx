import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';
import Frame from '../../../components/Frame';
import Wrapper from '../../../components/Wrapper';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import BtnPrimary from '../../../components/BtnPrimary';
import ToolBar2 from '../../../components/ui/ToolBar2';

const Attendance = () => {
  return (
    <>
      <Frame navTitle='알바ON'>
        <ToolBar2 isEmployee />
        <div className='w-full flex flex-col gap-10 mt-7'>
          {/* 오늘 출근 목록 */}
          <Wrapper title='오늘 출근 목록'>
            <WhiteBox border className='py-5'>
              <div className='flex flex-col gap-1 text-start'>
                <div className='flex justify-between items-center'>
                  <WorkPlaceName name='롯데리아' colorType='02' />
                  <FaAngleRight />
                </div>
                <div className='font-bold text-gray-400'>9:00 ~ 10:00</div>
                <div className='border rounded-sm text-sm border-hanaLightGreen px-3 mb-2'>
                  [롯데리아] 행주 널어놓고 가세요
                </div>
                <BtnPrimary text='출근' action={() => {}} />
              </div>
            </WhiteBox>
          </Wrapper>
          {/* 전체 출근 목록 */}
          <Wrapper title='전체 출근 목록'>
            <WhiteBox border className='py-3'>
              <div className='flex justify justify-between items-center '>
                <div className='flex flex-col items-start gap-1'>
                  <WorkPlaceName name='롯데리아 자양점' colorType='03' />
                  <div className='text-gray-400 text-sm'>
                    월요일 08:00 ~ 09:00
                  </div>
                </div>
                <FaAngleDown />
              </div>
            </WhiteBox>
          </Wrapper>
        </div>
      </Frame>
    </>
  );
};

export default Attendance;
