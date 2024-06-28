import { useParams } from 'react-router-dom';
import Frame from '../../../components/Frame';
import Wrapper from '../../../components/Wrapper';
import ToolBar2 from '../../../components/ui/ToolBar2';
import WhiteBox from '../../../components/ui/WhiteBox';
import ReturnArrow from '../../../components/ui/ReturnArrow';

const AttendanceDetail = () => {
  const { workPlace } = useParams();
  return (
    <>
      <Frame navTitle='알바ON'>
        <ToolBar2 isEmployee />
        <div className='w-full flex flex-col mt-5 pb-10'>
          <ReturnArrow To='/attendance' />
          <Wrapper title={workPlace} className='gap-3'>
            <div className='bg-white rounded-md border h-[200px]'> </div>
            <WhiteBox title='근무요일' border className='py-3 min-h-[200px]'>
              <div className='flex justify-between mt-5'>
                <div className='flex flex-col items-center'>
                  <div className='flex justify-center items-center rounded-sm bg-hanaLightGreen text-white font-bold w-[30px] h-[30px]'>
                    월
                  </div>
                  <div className='flex flex-col gap-0 text-sm mt-2'>
                    <div>09:00</div>
                    <div>10:00</div>
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='flex justify-center items-center rounded-sm bg-white border-hanaLightGreen w-[30px] h-[30px]'>
                    화
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='flex justify-center items-center rounded-sm bg-hanaLightGreen text-white font-bold w-[30px] h-[30px]'>
                    수
                  </div>
                  <div className='flex flex-col gap-0 text-sm mt-2'>
                    <div>09:00</div>
                    <div>10:00</div>
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='flex justify-center items-center rounded-sm bg-white border-hanaLightGreen w-[30px] h-[30px]'>
                    목
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='flex justify-center items-center rounded-sm bg-hanaLightGreen text-white font-bold w-[30px] h-[30px]'>
                    금
                  </div>
                  <div className='flex flex-col gap-0 text-sm mt-2'>
                    <div>09:00</div>
                    <div>10:00</div>
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='flex justify-center items-center rounded-sm bg-white border-hanaLightGreen w-[30px] h-[30px]'>
                    토
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='flex justify-center items-center rounded-sm bg-white border-hanaLightGreen w-[30px] h-[30px]'>
                    일
                  </div>
                </div>
              </div>
            </WhiteBox>
          </Wrapper>
          <Wrapper title='공지사항' className='mt-10'>
            <div>
              <WhiteBox title='롯데리아' border className='py-3'>
                <div className='text-start text-sm'>설거지 끝내놓고 가세요</div>
              </WhiteBox>
            </div>
          </Wrapper>
        </div>
      </Frame>
    </>
  );
};

export default AttendanceDetail;
