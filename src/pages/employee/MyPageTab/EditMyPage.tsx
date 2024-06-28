import { useNavigate } from 'react-router-dom';
import BtnBottom from '../../../components/BtnBottom';
import Frame from '../../../components/Frame';
import InputBox from '../../../components/ui/InputBox';

const EditMyPage = () => {
  const navigation = useNavigate();
  return (
    <>
      <Frame navTitle='알바ON'>
        <div className='w-full flex flex-col gap-2 h-full justify-between my-5'>
          <InputBox label='은행'></InputBox>

          <BtnBottom text='수정하기' action={() => navigation('/my/edit')} />
        </div>
      </Frame>
    </>
  );
};

export default EditMyPage;
