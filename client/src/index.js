import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);

serviceWorker.register();
// eslint-disable-next-line no-restricted-globals
const ignored = self.__WB_MANIFEST;

// Your custom service worker code goes here.
