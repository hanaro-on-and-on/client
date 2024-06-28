import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';
import NavToggle from './components/NavToggle';

function App() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/payment' element={<NavToggle />} />
      </Routes>
    </>
  );
}

export default App;
