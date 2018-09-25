import React, { Component } from 'react';
import {
  MenuItem,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  Select,
} from '@material-ui/core';

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
        <MenuItem value={SearchType.User}>User</MenuItem>
        <MenuItem value={SearchType.Drill}>Drill</MenuItem>
      </Select>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 80,
    },
    selectUser: {
      paddingLeft: 8,
      paddingTop: 0,
      paddingBottom: 0,
      height: 50,
      display: 'flex',
      alignItems: 'center',
    },
  });

export default withStyles(styles)(SearchField);
