// tslint:disable-next-line:max-line-length
import { Button, createStyles, Grid, MenuItem, Paper, Select, TextField, Theme, withStyles, WithStyles } from '@material-ui/core';
import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/AsyncCreatable';
import { bindActionCreators, compose, Dispatch } from 'redux';
// tslint:disable-next-line:max-line-length
import { getDrillsByCategoryIdRequest, getDrillsCategoriesRequest, searchDrillsByIdRequest } from 'src/store/drils/actions';
import drillsApi from 'src/store/drils/api';
import { DrillCategoriesGroupped, DrillCategoryType } from 'src/store/drils/model';
// tslint:disable-next-line:max-line-length
import { getCategoriesRequestStatusSelector, getGrouppedCategoriesSelector } from 'src/store/drils/selectors';
import { RootState } from 'src/store/rootReducers';
import userActions from 'src/store/user/store/actions';
import { isUserAnAdminSelector } from 'src/store/user/store/selectors';
import { CategoriesList } from './CategoriesList';

export interface ICategoriesProps extends WithStyles<typeof styles> {
  categories: DrillCategoriesGroupped;
  actions: {
    searchDrillsByIdRequest: typeof searchDrillsByIdRequest;
    getDrillsByCategoryIdRequest: typeof getDrillsByCategoryIdRequest;
    getDrillsCategoriesRequest: typeof getDrillsCategoriesRequest;
    selectUser: typeof userActions.selectUser;
  };
  loading: boolean;
  isAdmin: boolean;
}

export enum SearchType {
  User = 'user',
  Drill = 'drill',
}

export interface ICategoriesState {
  categoryType: string;
  searchType: SearchType;
}

const styles = (theme: Theme) =>
  createStyles({
    select: {
      paddingLeft: 8,
      paddingTop: 0,
      paddingBottom: 0,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: 4,
    },
    selectUser: {
      paddingLeft: 8,
      paddingTop: 0,
      paddingBottom: 0,
      height: 50,
      display: 'flex',
      alignItems: 'center',
    },
    rootBtn: {
      textTransform: 'capitalize',
      padding: 0,
    },
    rootIconBtn: {
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: 0,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
    },
    input: {
      display: 'flex',
      padding: 0,
      minHeight: 50,
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
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
      className={props.selectProps.classes.paper}
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
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

const Svg = p => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    focusable="false"
    role="presentation"
    {...p}
  />
);

const DropdownIndicator = () => (
  <div style={{ paddingRight: 8 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1
        1 0 0 1-1.425 1.402l-3.938-4.006a7.5
        7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="hsl(0,0%,80%)"
        fillRule="evenodd"
      />
    </Svg>
  </div>
);
const components: any = {
  DropdownIndicator,
  Control,
  Option,
  Menu,
  IndicatorSeparator: null,
};

class CategoriesBar extends Component<ICategoriesProps, any> {
  debounce: any = null;

  state = {
    categoryType: DrillCategoryType.Public,
    searchType: SearchType.User,
  };

  componentDidMount() {
    this.props.actions.getDrillsCategoriesRequest();
  }

  onCategoryTypeChange = (event: any) => {
    const categoryType = event.target.value;
    this.setState({
      [event.target.name]: categoryType,
    });
    const firstDrill = this.props.categories[categoryType][0];
    if (firstDrill) {
      this.getDrills(firstDrill.id, categoryType);
    }
  }
  getDrills = (id: string, category = this.state.categoryType) =>
    this.props.actions.getDrillsByCategoryIdRequest(id, category)

  selectUser = (option: { value: number; label: string } | null) => {
    if (this.state.searchType !== SearchType.User) {
      return;
    }
    this.props.actions.selectUser(option ? option.value : 'me');
    this.props.actions.getDrillsCategoriesRequest();
  }
  loadOptions = (query: string) => {
    if (this.state.searchType === SearchType.Drill) {
      return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        drillsApi
          .searchUsers(query, this.state.searchType)
          .then(response => resolve(response.data))
          .catch(err => reject(err));
      },                         300);
    });
  }
  onSearchTypesChange = (event: any) => {
    this.setState({
      searchType: event.target.value,
    });
  }
  searchDrill = (id: string) => {
    if (this.state.searchType !== SearchType.Drill || !id) {
      return;
    }
    this.props.actions.searchDrillsByIdRequest(id);
  }

  get searchPlaceholder() {
    if (this.state.searchType === SearchType.Drill) {
      return 'Search by ID...';
    }
    return 'Search by email or name...';
  }
  validateSearchInput = (value: string) => {
    if (this.state.searchType === SearchType.Drill) {
      return Boolean(value.match(/^\d+$/));
    }
    return true;
  }

  render() {
    const { classes } = this.props;
    const selectStyles = {};

    return (
      <Paper>
        {this.props.isAdmin && (
          <Grid
            container
            style={{
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 4,
              marginBottom: 8,
            }}
          >
            <Grid item md={9}>
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
            </Grid>
            <Grid item md={3}>
              <Select
                value={this.state.searchType}
                onChange={this.onSearchTypesChange}
                name="searchType"
                disableUnderline
                autoWidth
                style={{
                  fontSize: '0.875rem',
                  width: '100%',
                }}
                classes={{
                  select: classes.selectUser,
                }}
              >
                <MenuItem value={SearchType.User}>User</MenuItem>
                <MenuItem value={SearchType.Drill}>Drill</MenuItem>
              </Select>
            </Grid>
          </Grid>
        )}
        {this.state.searchType !== SearchType.Drill && (
          <>
            <Button
              fullWidth
              classes={{
                root: classes.rootBtn,
              }}
            >
              <Select
                value={this.state.categoryType}
                onChange={this.onCategoryTypeChange}
                name="categoryType"
                disableUnderline
                autoWidth
                style={{
                  width: '100%',
                  fontSize: '0.875rem',
                }}
                classes={{
                  select: classes.select,
                }}
              >
                <MenuItem value={DrillCategoryType.Public}>
                  Public Categories
                </MenuItem>
                <MenuItem value={DrillCategoryType.Custom}>
                  Custom Categories
                </MenuItem>
              </Select>
            </Button>
            {this.props.loading ? (
              <ContentLoader
                height={200}
                width={373}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
              >
                <rect x="5.5" y="8" rx="0" ry="0" width="365" height="38" />
                <rect x="5.5" y="68" rx="0" ry="0" width="365" height="38" />
                <rect x="5.5" y="128" rx="0" ry="0" width="365" height="38" />
              </ContentLoader>
            ) : (
              <CategoriesList
                categories={this.props.categories[this.state.categoryType]}
                onSelectCategory={this.getDrills}
              />
            )}
          </>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: getGrouppedCategoriesSelector(state),
  loading: getCategoriesRequestStatusSelector(state),
  isAdmin: isUserAnAdminSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      searchDrillsByIdRequest,
      getDrillsByCategoryIdRequest,
      getDrillsCategoriesRequest,
      selectUser: userActions.selectUser,
      // tslint:disable-next-line:align
    },
    dispatch,
  ),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(CategoriesBar);
