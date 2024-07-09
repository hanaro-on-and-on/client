import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { DateProvider } from './contexts/Date-Context.tsx';
import { PlaceProvider } from './contexts/Place-Context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DateProvider>
        <PlaceProvider>
          <App />
        </PlaceProvider>
      </DateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
