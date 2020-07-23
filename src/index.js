import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import ErrorBoundary from './components/error-boundary';
import App from './components/app';
import history from './history';

ReactDOM.render(
  <ErrorBoundary>
    <Router history={history}>
      <App />
    </Router>
  </ErrorBoundary>,
  document.getElementById('root')
);
