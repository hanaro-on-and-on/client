import Frame from '../../components/Frame';
import NavToggle from '../../components/NavToggle';

const PaymentMain = () => {
  return (
    <>
      <Frame navTitle='알바ON'>
        <NavToggle
          first='급여관리'
          second='근무 관리'
          firstSelected={() => {}}
          secondSelected={() => {}}
        />
        <div>안녕하세요</div>
      </Frame>
    </>
  );
};

export default PaymentMain;
