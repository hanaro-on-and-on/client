import { useNavigate } from 'react-router-dom';
import Frame from '../../../components/Frame';
import Wrapper from '../../../components/Wrapper';
import WhiteBox from '../../../components/ui/WhiteBox';
import WorkPlaceName from '../../../components/ui/WorkPlaceName';
import ToolBar2 from '../../../components/ui/ToolBar2';
import ReturnArrow from '../../../components/ui/ReturnArrow';

const MyPage = () => {
  const navigation = useNavigate();
  return (
    <Frame navTitle='알바ON'>
      <ToolBar2 isEmployee />
      <div className='w-full flex flex-col gap-10 '>
        {/* 나의 정보 */}
        <Wrapper title='나의 정보' className='mt-7'>
          <WhiteBox className='px-3 py-7' border>
            <div className='flex flex-col gap-2 text-sm'>
              {/* 성명 */}
              <div className='flex justify-between'>
                <div>성명</div>
                <div className='text-gray-400'>이름</div>
              </div>
              {/* 전화번호 */}
              <div className='flex justify-between'>
                <div>전화번호</div>
                <div className='text-gray-400'>이름</div>
              </div>
              {/* 계좌번호 */}
              <div className='flex justify-between'>
                <div>계좌번호</div>
                <div className='text-gray-400'>이름</div>
              </div>
            </div>
          </WhiteBox>
          {/* 수정하기 버튼 */}
          <button
            className=' self-end text-gray-400 text-sm mt-2 pr-2 bg-transparent'
            onClick={() => navigation('/my/edit')}
          >
            수정하기
          </button>
        </Wrapper>

        {/* 근로계약서 */}
        <Wrapper title='근로계약서'>
          <div className='flex flex-col'>
            <WhiteBox className='px-3 py-5' border>
              <div className='flex flex-col justify-center text-sm w-full'>
                <div className='w-full flex justify-between items-center'>
                  <WorkPlaceName name='롯데리아' colorType='02' />
                  <div>2023.01.01</div>
                </div>
              </div>
            </WhiteBox>
          </div>
        </Wrapper>
      </div>
    </Frame>
  );
};

export default MyPage;