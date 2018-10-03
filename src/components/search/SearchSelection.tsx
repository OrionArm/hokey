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
  User = 'User',
  Drill = 'Drill',
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
        renderValue={value => {
          return (
            <Tooltip title={value} placement="top">
              <IconButton
                className={classes.icon}
                disableRipple
                aria-label={`${value}`}
              >
                {value === SearchType.User ? (
                  <FontAwesomeIcon icon={faUser} />
                ) : (
                  <FontAwesomeIcon icon={faHockeyPuck} />
                )}
              </IconButton>
            </Tooltip>
          );
        }}
        autoWidth
        classes={{
          select: classes.selectUser,
          root: classes.root,
        }}
      >
        <MenuItem className={classes.menuItem} value={SearchType.User}>
          {SearchType.User}
        </MenuItem>
        <MenuItem className={classes.menuItem} value={SearchType.Drill}>
          {SearchType.Drill}
        </MenuItem>
      </Select>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    menuItem: {},
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
        opacity: 0.4,
      },
    },
  });

export default withStyles(styles)(SearchField);
