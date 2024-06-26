import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';

function App() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
