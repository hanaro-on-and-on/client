import BtnBottom from '../components/btnBottom';
import Wrapper from '../components/wrapper';

const Test = () => {
  const func = () => {
    console.log('안녕하세요');
  };
  return (
    <>
      <Wrapper navTitle='알바ON'>
        <div className='text-2xl font-bold text-hanaLightGreen'>test</div>
        <BtnBottom text='안녕하세요' action={func} />
      </Wrapper>
    </>
  );
};

export default Test;
