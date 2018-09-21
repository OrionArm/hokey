import React, { Component } from 'react';
import {
  Paper,
  Checkbox,
  FormControlLabel,
  List,
  Button,
  withStyles,
  createStyles,
} from '@material-ui/core';

import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ToolsPanel from '../../UI/ToolsPanel';
import { RootState } from '../../store/rootReducers';
import { getDrillsSelector, getSelectedDrillSelector } from '../../drills/selectors';
import { Drill, DrillDetailed } from 'src/drills/model';
import DrillsItem from './DrillsItem';
import { getDrillRequest } from 'src/drills/actions';

interface DrillsProps {
  classes: any;
  drills: Drill[];
  actions: {
    selectDrill: typeof getDrillRequest,
  };
  selectedDrill: DrillDetailed | null;
}
interface State {
  checkedIds: { [id: string]: boolean };
  // drills: Drill[];
}

const styles = createStyles({
  rootBtn: {
    textTransform: 'capitalize',
    padding: 0,
  },
  rootLabel: {
    margin: 0,
    paddingRight: 16,
  },
});

class DrillsBar extends Component<DrillsProps, State> {
  state = {
    checkedIds: {},
    // drills: [],
  };

  get checkedIdsAsArray() {
    return Object.keys(this.state.checkedIds)
      .filter(id => this.state.checkedIds[id]);
  }

  handleToggle = (id: string) => () => {
    const checkedIds = { ...this.state.checkedIds, [id]: !this.state.checkedIds[id] };
    this.setState({ checkedIds });
  }

  toggleAll = (event: any, checked: boolean) => {
    const checkedIds = this.props.drills.reduce((a, drill) => ({ ...a, [drill.id]: checked }), {});
    this.setState({ checkedIds });
  }

  toggleAnimated = (event: any, checked: boolean) => {
    const checkedIds = this.props.drills
      .filter(drill => drill.has_animation)
      .reduce((a, drill) => ({ ...a, [drill.id]: checked }), this.state.checkedIds);
    this.setState({ checkedIds });
  }

  isDrillSelected = (id: string) => {
    return this.props.selectedDrill ? this.props.selectedDrill.id === id : false;
  }

  public render() {
    const { classes } = this.props;
    return (
      <Paper>
        <header
          style={{
            justifyContent: 'space-between',
            display: 'flex',
            height: 50,
          }}
        >
          <div
            style={{
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 4,
              display: 'flex',
            }}
          >
            <Button
              classes={{
                root: classes.rootBtn,
              }}
              style={{
                borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: 0,
              }}
            >
              <FormControlLabel
                classes={{
                  root: classes.rootLabel,
                }}
                onChange={this.toggleAll}
                control={<Checkbox color="primary" />}
                label="All"
              />
            </Button>
            <Button
              classes={{
                root: classes.rootBtn,
              }}
            >
              <FormControlLabel
                classes={{
                  root: classes.rootLabel,
                }}
                onChange={this.toggleAnimated}
                control={<Checkbox color="primary" />}
                label="Animated"
              />
            </Button>
          </div>
          <ToolsPanel checkedIds={this.checkedIdsAsArray} />
        </header>
        <List>
          {this.props.drills.map((value: Drill) => (
            <DrillsItem
              key={value.id}
              onCheck={this.handleToggle(value.id)}
              drill={value}
              checked={this.state.checkedIds[value.id]}
              selectDrill={this.props.actions.selectDrill}
              isSelected={this.isDrillSelected(value.id)}
            />
          ))}
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  drills: getDrillsSelector(state),
  selectedDrill: getSelectedDrillSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    selectDrill: getDrillRequest,
  },                          dispatch),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(DrillsBar);
