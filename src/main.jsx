import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PropertyProvider from './context/PropertyContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PropertyProvider>
      <App />
    </PropertyProvider>
  </React.StrictMode>
);

