import React, { Component } from 'react';
import {
  MenuItem,
  Paper,
  withStyles,
  WithStyles,
  createStyles,
  Grid,
  Theme,
  Select,
} from '@material-ui/core';

import { CategoriesList } from './CategoriesList';
import { DrillCategoryType, DrillCategoriesGroupped } from '../../drills/model';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducers';
import {
  getDrillsByCategoryIdRequest,
  getDrillsCategoriesRequest,
  searchDrillsByIdRequest,
} from '../../drills/actions';
import {
  getGrouppedCategoriesSelector,
  getCategoriesRequestStatusSelector,
} from '../../drills/selectors';
import ContentLoader from 'react-content-loader';
import { isUserAnAdminSelector } from 'src/user/selectors';
import userActions from 'src/user/actions';
import SearchField from 'src/components/search/SearchField';
import SearchSelection from 'src/components/search/SearchSelection';

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
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    },
  });

class CategoriesBar extends Component<ICategoriesProps, any> {
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

  onSearchTypesChange = (event: any) => {
    this.setState({
      searchType: event.target.value,
    });
  }

  render() {
    const { isAdmin, classes } = this.props;
    return (
      <Paper>
        {isAdmin && (
          <Grid
            container
            style={{
              marginBottom: 8,
            }}
          >
            <SearchField
              searchType={this.state.searchType}
              actions={this.props.actions}
            />
            <SearchSelection
              onSearchTypesChange={this.onSearchTypesChange}
              searchType={this.state.searchType}
            />
          </Grid>
        )}
        {this.state.searchType !== SearchType.Drill && (
          <>
            <Select
              value={this.state.categoryType}
              onChange={this.onCategoryTypeChange}
              name="categoryType"
              autoWidth
              fullWidth
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
