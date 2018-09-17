import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MenuList,
  MenuItem,
  withStyles,
  createStyles,
} from '@material-ui/core';

export interface IMainMenuProps {
  classes?: any;
}

export interface IMainMenuState {
  value: number;
  classes?: any;
}
const styles = (theme: any) => {
  console.log(theme);

  return createStyles({
    list: {
      display: 'flex',
      backgroundColor: '#fff',
      padding: 0,
    },
    menuItem: {},
    linkItem: {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
      textAlign: 'center',
      padding: 16,
    },
    selected: {
      color: theme.palette.primary.main,
    },
  });
};
class MainMenu extends Component<IMainMenuProps, IMainMenuState> {
  public render() {
    const { classes } = this.props;
    return (
      <MenuList className={classes.list}>
        <MenuItem className={classes.menuItem}>
          <NavLink
            className={classes.linkItem}
            to="/drills"
            activeClassName={classes.selected}
          >
            My Drills
          </NavLink>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <NavLink
            className={classes.linkItem}
            to="/logos"
            activeClassName={classes.selected}
          >
            My Logos
          </NavLink>
        </MenuItem>
      </MenuList>
    );
  }
}

export default withStyles(styles)(MainMenu);
