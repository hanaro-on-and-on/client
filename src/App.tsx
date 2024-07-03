import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';
// import UiTest from './pages/UiTest';
import OwnerMainPage from './pages/OwnerMainPage';
import CalendarCustom from './components/ui/CalendarCustom';
// import DateDetail from './components/calendar-owner/DateDetail';
// import AttendanceEdit from './components/calendar-owner/AttendanceEdit';
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
import ManualWorkPlaceAddition from './pages/employee/PartTimeTab/ManualWorkPlaceAddition';
import DateDetail from './components/owner-calendar/DateDetail';
import AttendanceEdit from './components/owner-calendar/AttendanceEdit';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/test' element={<Test />} />
        {/* <Route path='/ui' element={<UiTest />} /> */}
        <Route path='/owner/*' element={<OwnerMainPage />}>
          <Route path='calendar' element={<CalendarCustom />} />
          <Route path='calendar/:date' element={<DateDetail />} />
          <Route
            path='calendar/attendance/:id/edit'
            element={<AttendanceEdit />}
          />
        </Route>
        {/* <Route path='/owner-calendar' element={<OwnerCalendarPage />} /> */}
        <Route path='/part-time/*' element={<PaymentMain />}>
          <Route path='worktime' element={<WorkTime />} />
          <Route path='payment' element={<Payment />} />
        </Route>
        <Route
          path='/part-time/payment/detail/:dayMonth/:workPlace'
          element={<PaymentDetail />}
        />
        <Route
          path='/part-time/worktime/manual/addition'
          element={<ManualWorkPlaceAddition />}
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
        <Route path='/hi' element={<ManualWorkPlaceAddition />} />
      </Routes>
    </>
  );
}

export default App;
