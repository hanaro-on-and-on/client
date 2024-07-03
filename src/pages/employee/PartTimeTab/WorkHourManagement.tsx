import { useNavigate } from 'react-router-dom';
import WhiteBox from '../../../components/ui/WhiteBox';

type Prop = {
  year: number;
  month: number;
};

const WorkHourManagement = ({ year, month }: Prop) => {
  const navigate = useNavigate();

  return (
    <>
      {month && (
        <WhiteBox className='w-full py-5' border>
          <div></div>
        </WhiteBox>
      )}
    </>
  );
};

export default WorkHourManagement;
