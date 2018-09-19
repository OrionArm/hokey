import React from 'react';
import { Grid, withStyles } from '@material-ui/core';

const styles = () => ({
  root: {
    height: '100%',
  },
});

type Props = { classes?: any };
const InCenter: React.SFC<Props> = ({ classes, children }) => {
  return (
    <Grid item xs={12} className={classes.root}>
      <Grid
        className={classes.root}
        container
        spacing={16}
        alignItems={'center'}
        justify={'center'}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(InCenter as any);
