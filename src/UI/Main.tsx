import React, { SFC } from 'react';
import { Grid } from '@material-ui/core';

export const Main: SFC<any> = ({ children }) => {
  return (
    <Grid
      container
      justify="space-between"
      component="main"
      style={{ margin: '24px auto 0', padding: '0 24px', maxWidth: 1500 }}
    >
      {children}
    </Grid>
  );
};
