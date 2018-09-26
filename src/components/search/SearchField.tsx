import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/AsyncCreatable';
import {
  MenuItem,
  Paper,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  TextField,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import userActions from 'src/store/user/store/actions';
import drillsApi from 'src/store/drils/api';
import {
  getDrillsCategoriesRequest,
  searchDrillsByIdRequest,
} from 'src/store/drils/actions';

export enum SearchType {
  User = 'user',
  Drill = 'drill',
}

export interface ISearchFieldProps extends WithStyles<typeof styles> {
  searchType: SearchType;
  actions: {
    searchDrillsByIdRequest: typeof searchDrillsByIdRequest;
    getDrillsCategoriesRequest: typeof getDrillsCategoriesRequest;
    selectUser: typeof userActions.selectUser;
  };
}

class SearchField extends Component<ISearchFieldProps, any> {
  debounce: any = null;
  loadOptions = (query: string) => {
    if (this.props.searchType === SearchType.Drill) {
      return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        drillsApi
          .searchUsers(query, this.props.searchType)
          .then(response => resolve(response.data))
          .catch(err => reject(err));
      },                         300);
    });
  }

  validateSearchInput = (value: string) => {
    if (this.props.searchType === SearchType.Drill) {
      return Boolean(value.match(/^\d+$/));
    }
    return true;
  }

  selectUser = (option: { value: number; label: string } | null) => {
    if (this.props.searchType !== SearchType.User) {
      return;
    }
    this.props.actions.selectUser(option ? option.value : 'me');
    this.props.actions.getDrillsCategoriesRequest();
  }

  searchDrill = (id: string) => {
    if (this.props.searchType !== SearchType.Drill || !id) {
      return;
    }
    this.props.actions.searchDrillsByIdRequest(id);
  }

  get searchPlaceholder() {
    if (this.props.searchType === SearchType.Drill) {
      return 'Search by ID...';
    }
    return 'Search by email or name...';
  }

  public render() {
    const { classes } = this.props;
    const selectStyles = {
      container: base => ({
        ...base,
        flexGrow: 1,
      }),
    };
    return (
      <AsyncSelect
        styles={selectStyles}
        classes={classes}
        components={components}
        loadOptions={this.loadOptions}
        isClearable={true}
        onCreateOption={this.searchDrill}
        isValidNewOption={this.validateSearchInput}
        formatCreateLabel={value => `Search ${value}`}
        onChange={this.selectUser}
        placeholder={this.searchPlaceholder}
      />
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    optionBack: {
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
    },
    inputControl: {
      display: 'flex',
      padding: 0,
      minHeight: 50,
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      '&:hover $svgSearch': {
        color: 'hsl(0,0%,0%)',
      },
    },
    svgSearch: {
      color: 'hsl(0,0%,60%)',
    },
  });

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="li"
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.optionBack}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}
function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}
function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.inputControl,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

const DropdownIndicator = props => (
  <div style={{ paddingRight: 8 }}>
    <FontAwesomeIcon
      className={props.selectProps.classes.svgSearch}
      icon={faSearch}
    />
  </div>
);

const components: any = {
  DropdownIndicator,
  Control,
  Option,
  Menu,
  IndicatorSeparator: null,
};

export default withStyles(styles)(SearchField);
