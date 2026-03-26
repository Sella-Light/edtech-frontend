// Điểm nhập chính để React render vào tệp HTML
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // File chứa cấu hình Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);