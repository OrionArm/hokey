import * as React from 'react';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';
import store from './store';

const history = createBrowserHistory();

export const Root: React.SFC<any> = ({ children }) => (
  <Provider store={store}>
    <Router history={history}>
      {children}
    </Router>
  </Provider>
);
