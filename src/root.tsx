import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { AppContainer } from 'react-hot-loader';

import store, { history } from './store';
import theme from './theme/';

export const Root: React.SFC<any> = ({ children }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer>
          <MuiThemeProvider theme={theme}>
          {children}
          </MuiThemeProvider>
        </AppContainer>
      </ConnectedRouter>
    </Provider>
  );
};
