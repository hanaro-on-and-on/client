import { useState } from 'react';
import Nav from '../components/Nav';
import CalendarCustom from '../components/ui/CalendarCustom';
import ToolBar from '../components/ui/ToolBar';

const ownerOptions = ['나의 사업장', '캘린더'];

const OwnerMainPage = () => {
  const [selected, setSelected] = useState(0);
  const onClickSelected = (idx: number) => {
    setSelected(idx);
  };

  return (
    <div>
      <Nav title='사장님 ON'></Nav>
      <ToolBar
        options={ownerOptions}
        selected={selected}
        onClickSelected={onClickSelected}
      />
      {selected == 1 && <CalendarCustom />}
    </div>
  );
};
export default OwnerMainPage;
