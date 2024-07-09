import { useNavigate } from 'react-router-dom';
import Frame from '../../components/Frame';
import BtnBottom from '../../components/BtnBottom';

const EmployeeGreeting = () => {
  const navigation = useNavigate();
  return (
    <>
      <Frame navTitle='알바ON'>
        <div className='w-full h-full flex flex-col justify-between'>
          <div className='flex flex-col justify-center items-center h-full'>
            <div className='text-2xl font-bold'>안녕하세요</div>
            <br></br>
            <div>{`대표 계좌를 등록하면\n 하나은행이\n`}</div>
            <br></br>
            <div className='text-hanaLightGreen font-semibold'>
              <span>급여관리</span>
              <br></br>
              <span>일정관리</span>
              <br></br>
              <span>출퇴근관리</span>
            </div>
            <br></br>
            <div>를 도와드립니다</div>
          </div>

          <div className='flex h-[20%] items-end'>
            <BtnBottom
              text='알바ON 시작하기'
              action={() => navigation('/greeting/employee/account')}
            />
          </div>
        </div>
      </Frame>
    </>
  );
};

export default EmployeeGreeting;
