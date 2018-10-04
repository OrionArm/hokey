import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import store, { history } from './store';
import theme from './theme/';
import './styles/index.css';

export const Root: React.SFC<any> = ({ children }) => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>{children}</Router>
      </MuiThemeProvider>
    </Provider>
  );
};
