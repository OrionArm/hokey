import React, { Component } from 'react';
import {
  MenuItem,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  Select,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHockeyPuck } from '@fortawesome/free-solid-svg-icons';

export enum SearchType {
  User = 'user',
  Drill = 'drill',
}

export interface ISearchFieldProps extends WithStyles<typeof styles> {
  onSearchTypesChange: Function;
  searchType: SearchType;
}

class SearchField extends Component<ISearchFieldProps, any> {
  public render() {
    const { classes } = this.props;
    return (
      <Select
        value={this.props.searchType}
        onChange={e => this.props.onSearchTypesChange(e)}
        name="searchType"
        autoWidth
        classes={{
          select: classes.selectUser,
          root: classes.root,
        }}
      >
        <MenuItem className={classes.menuItem} value={SearchType.User}>
          <Tooltip title="Users" placement="top">
            <IconButton
              className={classes.icon}
              disableRipple
              aria-label="Users"
            >
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
          </Tooltip>
        </MenuItem>
        <MenuItem className={classes.menuItem} value={SearchType.Drill}>
          <Tooltip title="Drills" placement="top">
            <IconButton
              className={classes.icon}
              disableRipple
              aria-label="Drills"
            >
              <FontAwesomeIcon icon={faHockeyPuck} />
            </IconButton>
          </Tooltip>
        </MenuItem>
      </Select>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    menuItem: {
      '&:hover $icon': {
        color: theme.palette.primary.main,
      },
    },
    root: {
      width: 70,
    },
    icon: {
      transition: '0.3s',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    selectUser: {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      '&:hover $icon': {
        color: theme.palette.primary.main,
      },
    },
  });

export default withStyles(styles)(SearchField);
