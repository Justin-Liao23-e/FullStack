import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Create a root element for React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App inside a BrowserRouter (for routing)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);