import React, { Component } from 'react';
import {
  Select,
  MenuItem,
  Paper,
  Button,
  withStyles,
  createStyles,
} from '@material-ui/core';
import AsyncSelect from 'react-select/lib/Async';

import { CategoriesList } from './CategoriesList';
import { DrillCategoryType, DrillCategoriesGroupped } from '../../drills/model';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducers';
import {
  getDrillsByCategoryIdRequest,
  getDrillsCategoriesRequest,
} from '../../drills/actions';
import {
  getGrouppedCategoriesSelector,
  getCategoriesRequestStatusSelector,
} from '../../drills/selectors';
import ContentLoader from 'react-content-loader';
import { isUserAnAdminSelector } from 'src/user/selectors';
import drillsApi from 'src/drills/api';
import userActions from 'src/user/actions';

export interface ICategoriesProps {
  classes?: any;
  categories: DrillCategoriesGroupped;
  actions: {
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

const styles = createStyles({
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
  rootBtn: {
    textTransform: 'capitalize',
    padding: 0,
  },
  rootIconBtn: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 0,
  },
});

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

  onSelectUser = (event: any) => {
    // const userId = event.target.value;
  }

  getDrills = (id: string, category = this.state.categoryType) =>
    this.props.actions.getDrillsByCategoryIdRequest(id, category)

  selectUser = (option: { value: number, label: string } | null) => {
    this.props.actions.selectUser(option ? option.value : 'me');
    this.props.actions.getDrillsCategoriesRequest();
  }
  loadOptions = (query: string) => {
    return new Promise((resolve, reject) => {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        drillsApi.searchUsers(query, this.state.searchType)
          .then(response => resolve(response.data))
          .catch(err => reject(err));
      },                         300);
    });
  }
  onSearchTypesearch = (event: any) => {
    this.setState({
      searchType: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper>
        {this.props.isAdmin &&
          <div style={{ display: 'flex' }}>
            <div style={{ width: '80%' }}>
              <AsyncSelect
                loadOptions={this.loadOptions}
                placeholder="Search..."
                isClearable={true}
                onChange={this.selectUser}
              />
            </div>
            <Select
              value={this.state.searchType}
              onChange={this.onSearchTypesearch}
              name="searchType"
              disableUnderline
              autoWidth
              style={{
                width: '20%',
                fontSize: '0.875rem',
              }}
              classes={{
                select: classes.select,
                root: classes.root,
              }}
            >
              <MenuItem value={SearchType.User}>
                User
              </MenuItem>
              <MenuItem value={SearchType.Drill}>
                Drill
              </MenuItem>
            </Select>
          </div>
        }
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
              root: classes.root,
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
