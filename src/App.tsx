import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';
import UiTest from './pages/UiTest';
import OwnerCalendarPage from './pages/OwnerMainPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/ui' element={<UiTest />} />
        <Route path='/owner-calendar' element={<OwnerCalendarPage />} />
      </Routes>
    </>
  );
}

export default App;
