import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './pages/App';

const root = document.getElementById('root');

const createRoot = ReactDOM.createRoot || require('react-dom/client').createRoot; 
const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
