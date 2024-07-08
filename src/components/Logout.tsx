import { useLocation, useNavigate } from 'react-router-dom';
import { removeCookie } from '../utils/cookie';
import BtnPrimary from './BtnPrimary';

const Logout = () => {
  const navigation = useNavigate();
  const location = useLocation();
  return (
    <>
      <BtnPrimary
        text='로그아웃'
        action={() => {
          removeCookie('x-access-token');
          navigation('/', { replace: true });
        }}
      />
    </>
  );
};

export default Logout;
