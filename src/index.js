// נקודת הכניסה הראשית של Create React App.
// הקובץ מוצא את אלמנט root מדף index.html ומציג לתוכו את עץ הרכיבים.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
