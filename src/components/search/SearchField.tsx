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
  theme: Theme;
  isDrillExist: () => boolean;
  actions: {
    searchDrillsByIdRequest: typeof searchDrillsByIdRequest;
    getDrillsCategoriesRequest: typeof getDrillsCategoriesRequest;
    selectUser: typeof userActions.selectUser;
  };
}

class SearchField extends Component<ISearchFieldProps, any> {
  state = {
    value: '',
  };
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

  handleSelect = (option: { value: number; label: string } | null) => {
    if (this.props.searchType === SearchType.User) {
      this.props.actions.selectUser(option ? String(option.value) : 'me');
      this.props.actions.getDrillsCategoriesRequest();
    } else if (this.props.searchType === SearchType.Drill && option) {
      this.setState({
        value: option.label,
      });
      this.props.actions.searchDrillsByIdRequest(option.label);
    }
    return;
  }

  // searchDrill = (id: string) => {
  //   if (this.props.searchType !== SearchType.Drill || !id) {
  //     return;
  //   }
  //   this.props.actions.searchDrillsByIdRequest(id);
  // }

  get searchPlaceholder() {
    if (this.props.searchType === SearchType.Drill) {
      if (this.props.isDrillExist()) {
        return (
          <span style={{ color: this.props.theme.palette.error.main }}>
            Drill with id {this.state.value} not exist
          </span>
        );
      }
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
        autoFocus
        loadOptions={this.loadOptions}
        isClearable={!this.props.isDrillExist()}
        controlShouldRenderValue={!this.props.isDrillExist()}
        // onCreateOption={this.searchDrill}
        isValidNewOption={this.validateSearchInput}
        formatCreateLabel={value => `Search ${value}`}
        noOptionsMessage={() => 'Enter id drill'}
        onChange={this.handleSelect}
        placeholder={this.searchPlaceholder}
        styles={selectStyles}
        classes={classes}
        isDrillExist={this.props.isDrillExist}
        components={components}
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
      transition: 'color 0.3s',
      color: 'hsl(0,0%,60%)',
    },
    svgSearchErorr: {
      transition: 'color 0.3s',
      color: theme.palette.error.main,
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
      error={props.selectProps.isDrillExist()}
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

const DropdownIndicator = ({ selectProps }) => (
  <div style={{ paddingRight: 8 }}>
    <FontAwesomeIcon
      className={
        selectProps.isDrillExist()
          ? selectProps.classes.svgSearchErorr
          : selectProps.classes.svgSearch
      }
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

export default withStyles(styles, { withTheme: true })(SearchField);
