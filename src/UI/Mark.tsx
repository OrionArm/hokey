import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';

interface IMarkProps extends WithStyles<typeof styles> {
  textContent: string;
}

const Mark: React.SFC<IMarkProps> = ({ textContent, classes }) => (
  <div className={classes.mark}>{textContent}</div>
);
const styles = (theme: Theme) =>
  createStyles({
    mark: {
      position: 'absolute',
      top: 20,
      right: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: 'inherit',
      fontFamily:' Poppins,sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      paddingRight: 15,
      height: 30,
      zIndex: 1,
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: -15,
        transform: 'skew(45deg)',
        width: 30,
        height: 15,
        backgroundColor: theme.palette.primary.main,
        zIndex: -1,
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 15,
        left: -15,
        transform: 'skew(-45deg)',
        width: 30,
        height: 14.5,
        backgroundColor: theme.palette.primary.main,
        zIndex: -1,
      },
    },
  });
export default withStyles(styles)(Mark);
