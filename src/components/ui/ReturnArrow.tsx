import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

type Prop = {
  To: string;

  text?: string;
};
const ReturnArrow = ({ To, text = '목록' }: Prop) => {
  const navigation = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigation(To);
        }}
        type='button'
        className='text-hanaLightGreen flex gap-2'
      >
        <FaAngleLeft className='bg-hanaLightGreen' />
        {text}
      </button>
    </>
  );
};

export default ReturnArrow;
