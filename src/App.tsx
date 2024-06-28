import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';
import PaymentMain from './pages/employee/PartTimeTab/PaymentMain';
import WorkTime from './pages/employee/PartTimeTab/WorkTime';
import Payment from './pages/employee/PartTimeTab/Payment';
import PaymentDetail from './pages/employee/PartTimeTab/PaymentDetail';
import MyPage from './pages/employee/MyPageTab/MyPage';
import EditMyPage from './pages/employee/MyPageTab/EditMyPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/part-time/*' element={<PaymentMain />}>
          <Route path='worktime' element={<WorkTime />} />
          <Route path='payment' element={<Payment />} />
        </Route>
        <Route
          path='/part-time/payment/detail/:dayMonth/:workPlace'
          element={<PaymentDetail />}
        />
        <Route path='/my' element={<MyPage />} />
        <Route path='/my/edit' element={<EditMyPage />} />
      </Routes>
    </>
  );
}

export default App;
