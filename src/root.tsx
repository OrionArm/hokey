import * as React from 'react';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';
import store from './store';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/globalStyle';
const history = createBrowserHistory();

export const Root: React.SFC<any> = ({ children }) => (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Router>
  </Provider>
);
