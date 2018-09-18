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
import { getDrillsByCategoryIdRequest, getDrillsCategoriesRequest } from '../../drills/actions';
import { getGrouppedCategoriesSelector } from '../../drills/selectors';

export interface ICategoriesProps {
  classes?: any;
  categories: DrillCategoriesGroupped;
  actions: {
    getDrillsByCategoryIdRequest: typeof getDrillsByCategoryIdRequest,
    getDrillsCategoriesRequest: typeof getDrillsCategoriesRequest,
  };
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
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

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
            style={{
              width: '100%',
              fontSize: '0.875rem',
            }}
            classes={{
              select: classes.select,
              root: classes.root,
            }}
          >
            <MenuItem value={DrillCategoryType.Public}>Public Categories</MenuItem>
            <MenuItem value={DrillCategoryType.Custom}>Custom Categories</MenuItem>
          </Select>
        </Button>
        <CategoriesList
          categories={this.props.categories[this.state.categoryType]}
          onSelectCategory={this.props.actions.getDrillsByCategoryIdRequest}
        />
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: getGrouppedCategoriesSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    getDrillsByCategoryIdRequest,
    getDrillsCategoriesRequest,
  // tslint:disable-next-line:align
  }, dispatch),
});

export default
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
  )(CategoriesBar);
