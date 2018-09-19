import React, { SFC } from 'react';
import { Grid } from '@material-ui/core';

const ProtectedContent: SFC<any> = ({ children }) => {
  return (
    <Grid
      container
      justify="space-between"
      component="main"
      style={{ marginTop: 24, padding: '0 24px' }}
    >
      {children}
    </Grid>
  );
};

export default ProtectedContent;
