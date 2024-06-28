import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';
import UiTest from './pages/UiTest';
import OwnerCalendarPage from './pages/OwnerMainPage';
import PaymentMain from './pages/employee/PaymentMain';
import WorkTime from './pages/employee/WorkTime';
import Payment from './pages/employee/Payment';
import PaymentDetail from './pages/employee/PaymentDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/ui' element={<UiTest />} />
        <Route path='/owner-calendar' element={<OwnerCalendarPage />} />
        <Route path='/part-time/*' element={<PaymentMain />}>
          <Route path='worktime' element={<WorkTime />} />
          <Route path='payment' element={<Payment />} />
        </Route>
        <Route
          path='/part-time/payment/detail/:dayMonth/:workPlace'
          element={<PaymentDetail />}
        />
      </Routes>
    </>
  );
}

export default App;
