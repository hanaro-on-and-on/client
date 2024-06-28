import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

type Prop = {
  To: string;

  text?: string;
};
const ReturnArrow = ({ To, text = '목록' }: Prop) => {
  const navigation = useNavigate();
  const onClick = () => {
    if (To === '-1') {
      navigation(-1);
      return;
    }
    navigation(To);
  };

  return (
    <div className='mb-1'>
      <button
        onClick={onClick}
        type='button'
        className='text-hanaLightGreen flex gap-2'
      >
        <FaAngleLeft className='' />
        {text}
      </button>
    </div>
  );
};

export default ReturnArrow;
