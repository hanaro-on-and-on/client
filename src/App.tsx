import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';
import UiTest from './pages/UiTest';
import PaymentMain from './pages/employee/PaymentMain';
import WorkTime from './pages/employee/WorkTime';
import Payment from './pages/employee/Payment';
import PaymentDetail from './pages/employee/PaymentDetail';
import OwnerMainPage from './pages/OwnerMainPage';
import CalendarCustom from './components/ui/CalendarCustom';
import DateDetail from './components/calendar-owner/DateDetail';
import AttendanceEdit from './components/calendar-owner/AttendanceEdit';

function App() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/ui' element={<UiTest />} />
        <Route path='/owner/*' element={<OwnerMainPage />}>
          <Route path='calendar' element={<CalendarCustom />} />
          <Route path='calendar/:date' element={<DateDetail />} />
          <Route
            path='calendar/attendance/:id/edit'
            element={<AttendanceEdit />}
          />
        </Route>
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
