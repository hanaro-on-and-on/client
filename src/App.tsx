import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/test';
import Nav from './components/nav';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/test' element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
