import * as React from 'react';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';
import store from './store';
const history = createBrowserHistory();
import theme from './theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

export const Root: React.SFC<any> = ({ children }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>{children}</Router>
    </MuiThemeProvider>
  </Provider>
);
