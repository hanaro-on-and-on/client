import CalendarEmployee from '../../../components/employee/CalendarEmployee';
import Frame from '../../../components/Frame';
import { EmployeeCalendarDataProvider } from '../../../contexts/Employee-Calender-Data-Context';

const EmployeeCalendar = () => {
  return (
    <>
      <Frame navTitle='알바ON' toolBar footer>
        <div className='w-full flex flex-col  items-center'>
          <EmployeeCalendarDataProvider>
            <CalendarEmployee />
          </EmployeeCalendarDataProvider>
        </div>
      </Frame>
    </>
  );
};
export default EmployeeCalendar;
