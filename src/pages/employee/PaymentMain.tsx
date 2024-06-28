import Frame from '../../components/Frame';
import NavToggle from '../../components/NavToggle';
import WhiteBox from '../../components/ui/WhiteBox';

const PaymentMain = () => {
  return (
    <>
      <Frame navTitle='알바ON'>
        <div className='w-full flex flex-col  items-center gap-5 mt-7'>
          <NavToggle
            first='급여관리'
            second='근무 관리'
            firstSelected={() => {}}
            secondSelected={() => {}}
          />
          <WhiteBox className='w-full' border>
            안녕?
          </WhiteBox>
        </div>
      </Frame>
    </>
  );
};

export default PaymentMain;
