import React, { Component } from 'react';
import {
  Select,
  MenuItem,
  Paper,
  Button,
  withStyles,
  createStyles,
} from '@material-ui/core';
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

export interface ICategoriesProps {
  classes?: any;
  categories: DrillCategoriesGroupped;
  actions: {
    getDrillsByCategoryIdRequest: typeof getDrillsByCategoryIdRequest;
    getDrillsCategoriesRequest: typeof getDrillsCategoriesRequest;
  };
  loading: boolean;
}

export interface ICategoriesState {
  categoryType: string;
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
  state = {
    categoryType: DrillCategoryType.Public,
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

  render() {
    const { classes } = this.props;
    return (
      <Paper>
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
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      getDrillsByCategoryIdRequest,
      getDrillsCategoriesRequest,
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
