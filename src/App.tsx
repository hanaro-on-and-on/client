import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';
// import UiTest from './pages/UiTest';
import OwnerMainPage from './pages/owner/OwnerMainPage';
import CalendarCustom from './components/ui/CalendarCustom';
import PaymentMain from './pages/employee/PartTimeTab/PaymentMain';
import WorkTime from './pages/employee/PartTimeTab/WorkTime';
import Payment from './pages/employee/PartTimeTab/Payment';
import PaymentDetail from './pages/employee/PartTimeTab/PaymentDetail';
import MyPage from './pages/employee/MyPageTab/MyPage';
import EditMyPage from './pages/employee/MyPageTab/EditMyPage';
import Attendance from './pages/employee/Attendance/Attendance';
import AttendanceDetail from './pages/employee/Attendance/AttendanceDeTail';
import LandingPage from './pages/LandingPage/LandingPage';
import EmployeeGreeting from './pages/LandingPage/EmployeeGreeting';
import EmployeeAddMainAccount from './pages/LandingPage/EmployeeAddMainAccount';
import ManualWorkPlaceAddition from './pages/employee/PartTimeTab/ManualWorkPlaceAddition';
import DateDetail from './components/owner-calendar/DateDetail';
import AttendanceEdit from './components/owner-calendar/AttendanceEdit';
import MyWorkPlaces from './components/owner-workplace/MyWorkPlaces';
import MyWorkPlaceDetail from './components/owner-workplace/MyWorkPlaceDetail';
import WorkEmployeeDetail from './components/owner-workplace/WorkEmployeeDetail';
import AttendanceCreate from './components/owner-calendar/AttendanceCreate';
import WorkPlaceAddPage from './pages/owner/WorkPlaceAddPage';
import WorkEmployeeAddFirst from './components/owner-workplace/WorkEmployeeAdd-First';
import WorkEmployeeAddSecond from './components/owner-workplace/WorkEmployeeAdd-Second';
import WorkEmployeeAddThird from './components/owner-workplace/WorkEmployeeAdd-Third';
import WorkEmployeeAddComplete from './components/owner-workplace/WorkEmployeeAdd-Complete';
import OwnerGreeting from './pages/LandingPage/OwnerGreeting';
import OwnerAddMainAccount from './pages/LandingPage/OwnerAddMainAccount';
import LoginPage from './pages/LoginPgae/LoginPage';
import CalendarEmployee from './components/employee/CalendarEmployee';
import WorkPlaceAdd from './components/owner-workplace/WorkPlaceAdd';
import AddWorkPlace from './pages/owner/AddWorkPlace';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/test' element={<Test />} />
        {/* <Route path='/ui' element={<UiTest />} /> */}
        {/* <Route path='/owner/myWorkPlaces/add' element={<WorkPlaceAddPage />} /> */}
        <Route path='/owner/addPlaceFirst' element={<WorkPlaceAdd />} />
        <Route path='/owner/addPlaceSecond' element={<AddWorkPlace />} />
        <Route path='/owner/*' element={<OwnerMainPage />}>
          <Route path='test' element={<CalendarEmployee />} />
          <Route path='calendar' element={<CalendarCustom />} />
          <Route path='calendar/:date' element={<DateDetail />} />
          <Route path='calendar/:date/add' element={<AttendanceCreate />} />
          <Route
            path='calendar/attendance/:id/edit'
            element={<AttendanceEdit />}
          />
          <Route path='myWorkPlaces' element={<MyWorkPlaces />} />
          <Route path='myWorkPlaces/:id' element={<MyWorkPlaceDetail />} />
          <Route
            path='myWorkPlaces/:placeId/addEmployee/first'
            element={<WorkEmployeeAddFirst />}
          />
          <Route
            path='myWorkPlaces/:placeId/addEmployee/second'
            element={<WorkEmployeeAddSecond />}
          />
          <Route
            path='myWorkPlaces/:placeId/addEmployee/third'
            element={<WorkEmployeeAddThird />}
          />
          <Route
            path='myWorkPlaces/:placeId/addEmployee/complete'
            element={<WorkEmployeeAddComplete />}
          />
          <Route
            path='myWorkPlaces/:placeId/employees/:id'
            element={<WorkEmployeeDetail />}
          />
          <Route
            path='/owner/*'
            element={<Navigate to='/owner/myWorkPlaces' replace />}
          />
        </Route>
        <Route path='/part-time/*' element={<PaymentMain />}>
          <Route path='worktime' element={<WorkTime />} />
        </Route>
        <Route
          path='/part-time/payment/detail/:yearMonth/:workPlace/:id/:connected'
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
          path='/attendance/detail/:workPlaceId'
          element={<AttendanceDetail />}
        />
        <Route path='/greeting/employee' element={<EmployeeGreeting />} />
        <Route path='/greeting/owner' element={<OwnerGreeting />} />
        <Route
          path='/greeting/owner/account'
          element={<OwnerAddMainAccount />}
        />
        <Route
          path='/greeting/employee/account'
          element={<EmployeeAddMainAccount />}
        />
        <Route path='/manual/addition' element={<ManualWorkPlaceAddition />} />
      </Routes>
    </>
  );
}

export default App;
