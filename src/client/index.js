import React from 'react';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import RouterHistory from './Tools/RouterHistory';

ReactDOM.render(
  <Router history={RouterHistory}>
    <App />
  </Router>,
  document.getElementById('root')
);
