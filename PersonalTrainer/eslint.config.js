import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
