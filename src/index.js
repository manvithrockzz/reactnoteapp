// importing react content for react templete
import React from 'react';
// as its dom client, do accordingly
import ReactDOM from 'react-dom/client';
// import also app
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
