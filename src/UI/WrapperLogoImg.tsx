import React from 'react';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';

type Props = { style?: any } & WithStyles<typeof styles>;

const styles = (theme: Theme) =>
  createStyles({
    wrapperLogoImg: {
      height: 250,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const WrapperLogoImg: React.SFC<Props> = ({ classes, children, style }) => (
  <div style={style} className={classes.wrapperLogoImg}>
    {children}
  </div>
);

export default withStyles(styles)(WrapperLogoImg);
