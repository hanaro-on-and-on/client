import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';
import PaymentMain from './pages/employee/PaymentMain';

function App() {
  return (
    <>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route path='/payment' element={<PaymentMain />} />
      </Routes>
    </>
  );
}

export default App;
