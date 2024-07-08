import React, { useState, useEffect } from 'react';
import Calendar, { OnArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TestCalendar: React.FC = () => {
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());

  useEffect(() => {
    // 최초 렌더링 시와 달이 변경될 때마다 호출됩니다.
    fetchNewData(activeStartDate);
  }, [activeStartDate]); // activeStartDate가 변경될 때마다 실행됩니다.

  const fetchNewData = (startDate: Date) => {
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    console.log(`Fetching data for ${year}-${month}`);
    console.log(startDate);

    // 실제로는 fetch를 사용하여 데이터를 가져오는 비동기 처리를 수행해야 합니다.
    // fetch(`/api/data?year=${year}&month=${month}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Fetched data:', data);
    //     // 데이터를 상태에 저장하거나 다른 처리를 진행할 수 있습니다.
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //   });
  };

  const handleActiveStartDateChange = ({
    action,
    activeStartDate,
    value,
    view,
  }: OnArgs) => {
    console.log('🚀  activeStartDate:', activeStartDate);
    console.log('🚀  view:', view);
    console.log('🚀  value:', value);
    console.log('🚀  action:', action);
    setActiveStartDate(activeStartDate!);
  };

  return (
    <div>
      <h2>Test Calendar</h2>
      <Calendar
        onChange={() => {}} // onChange는 필요 없으므로 빈 함수로 설정합니다.
        onActiveStartDateChange={handleActiveStartDateChange}
        value={activeStartDate}
        showNavigation={true}
      />
    </div>
  );
};

export default TestCalendar;
