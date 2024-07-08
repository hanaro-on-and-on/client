import Nav from '../../components/Nav';
import { Outlet } from 'react-router-dom';
import ToolBarLink from '../../components/ui/ToolBarLink';
import { CalendarDataProvider } from '../../contexts/Calender-Data-Context';
import { AttendanceProvider } from '../../contexts/Attendance-Context';
import { EmployeeContractProvider } from '../../contexts/EmployeeContract-Context';

const ownerOptions = [
  { idx: 0, title: '나의 사업장', url: 'myWorkPlaces' },
  { idx: 1, title: '캘린더', url: 'calendar' },
];

const OwnerMainPage = () => {
  return (
    <div style={{ height: '90vh' }}>
      <Nav title='사장님 ON'></Nav>
      <ToolBarLink options={ownerOptions} />
      <CalendarDataProvider>
        <AttendanceProvider>
          <EmployeeContractProvider>
            <Outlet />
          </EmployeeContractProvider>
        </AttendanceProvider>
      </CalendarDataProvider>
    </div>
  );
};
export default OwnerMainPage;
