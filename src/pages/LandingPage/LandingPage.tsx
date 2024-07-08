import { useNavigate } from 'react-router-dom';
import Frame from '../../components/Frame';
import Wrapper from '../../components/Wrapper';
import WhiteBox from '../../components/ui/WhiteBox';
import { getCookie } from '../../utils/cookie';
import { useEffect } from 'react';
import { getToken } from '../../utils/token';

const LandingPage = () => {
  const navigation = useNavigate();
  const token: string = getCookie('token');

  useEffect(() => {
    if (!getToken()) {
      navigation('/login');
    }
  });

  return (
    <>
      <Frame option={false}>
        {/* nav */}
        <div className='fix top-0 flex justify-between items-end pb-2 h-[60px] bg-white w-[390px] px-5'>
          <div className='flex justify-center items-center text-sm text-gray-600 rounded-2xl border border-gray-600 px-2'>
            전체계좌
          </div>
          <div className='flex gap-2 items-center'>
            <span>지갑</span>
            <span>알림</span>
          </div>
        </div>

        {/* body */}
        <div className='w-full flex flex-col mt-5'>
          <Wrapper title='급여 맞춤 서비스'>
            <div className='flex flex-col gap-2'>
              <WhiteBox border>
                <button
                  type='button'
                  className='w-full h-full flex justify-start bg-transparent py-3'
                  onClick={
                    token ? () => {} : () => navigation('/greeting/owner')
                  }
                >
                  사장님ON
                </button>
              </WhiteBox>
              <WhiteBox border>
                <button
                  type='button'
                  className='w-full h-full flex justify-start bg-transparent py-3'
                  onClick={
                    token ? () => {} : () => navigation('/greeting/owner')
                  }
                >
                  알바ON
                </button>
              </WhiteBox>
            </div>
          </Wrapper>
        </div>
      </Frame>
    </>
  );
};
export default LandingPage;
