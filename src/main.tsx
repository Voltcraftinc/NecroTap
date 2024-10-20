import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './Game'; // Import the Game component
import './index.css'; // Import the updated styles

// This is the main entry point of the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
