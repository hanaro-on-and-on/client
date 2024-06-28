import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';
import PaymentMain from './pages/employee/PartTimeTab/PaymentMain';
import WorkTime from './pages/employee/PartTimeTab/WorkTime';
import Payment from './pages/employee/PartTimeTab/Payment';
import PaymentDetail from './pages/employee/PartTimeTab/PaymentDetail';
import MyPage from './pages/employee/MyPageTab/MyPage';
import EditMyPage from './pages/employee/MyPageTab/EditMyPage';
import OwnerCalendarPage from './pages/OwnerMainPage';
import Attendance from './pages/employee/Attendance/Attendance';
import AttendanceDetail from './pages/employee/Attendance/AttendanceDeTail';
import LandingPage from './pages/LandingPage/LandingPage';
import EmployeeGreeting from './pages/LandingPage/EmployeeGreeting';
import EmployeeAddMainAccount from './pages/LandingPage/EmployeeAddMainAccount';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/test' element={<Test />} />
        <Route path='/owner-calendar' element={<OwnerCalendarPage />} />
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
        <Route path='/attendance' element={<Attendance />} />
        <Route
          path='/attendance/detail/:workPlace'
          element={<AttendanceDetail />}
        />
        <Route path='/greeting/employee' element={<EmployeeGreeting />} />
        <Route
          path='/greeting/employee/account'
          element={<EmployeeAddMainAccount />}
        />
      </Routes>
    </>
  );
}

export default App;
