import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  MenuList,
  MenuItem,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faHockeyPuck } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'src/store/rootReducers';
import { isLogosAvailableSelector } from 'src/store/user/store/selectors';

type Props = injectStateProps;

const mapStateToProps = (state: RootState) => ({
  access: isLogosAvailableSelector(state),
});

class MainMenu extends Component<Props, object> {
  public render() {
    const { access, classes } = this.props;
    return (
      <MenuList className={classes.list}>
        <MenuItem className={classes.menuItem}>
          <NavLink
            className={classes.linkItem}
            to="/drills"
            activeClassName={classes.LinkSelected}
          >
            <FontAwesomeIcon icon={faHockeyPuck} className={classes.icon} />
            My Drills
          </NavLink>
        </MenuItem>
        {access && (
          <MenuItem className={classes.menuItem}>
            <NavLink
              className={classes.linkItem}
              to="/logos"
              activeClassName={classes.LinkSelected}
            >
              <FontAwesomeIcon icon={faFileImage} className={classes.icon} />
              My Logos
            </NavLink>
          </MenuItem>
        )}
      </MenuList>
    );
  }
}

type injectStateProps = ReturnType<typeof mapStateToProps> &
  WithStyles<typeof styles>;

const styles = ({ palette, spacing, shadows }: Theme) =>
  createStyles({
    list: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: palette.common.white,
      padding: '0 24px',
      boxShadow: shadows['2'],
    },
    menuItem: {
      height: '100%',
      padding: 0,
    },

    linkItem: {
      color: palette.text.secondary,
      textDecoration: 'none',
      padding: '12px 16px',
    },
    LinkSelected: {
      color: palette.primary.main,
    },
    icon: {
      marginRight: spacing.unit,
    },
  });

export default compose(
  connect(
    mapStateToProps,
    null,
    null,
    { pure: false },
  ),
  withStyles(styles),
)(MainMenu);
