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
import { getDrillsSelector } from '../../drills/selectors';
import { Drill } from 'src/drills/model';
import DrillsItem from './DrillsItem';

interface DrillsProps {
  classes: any;
  drills: Drill[];
  actions: {

  };
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

  // static getDerivedStateFromProps(props: DrillsProps) {
  //   return {
  //     checkedIds: {},
  //     drills: props.drills,
  //   };
  // }

  handleToggle = (id: string) => () => {
    const checkedIds = { ...this.state.checkedIds, [id]: !this.state.checkedIds[id] };
    this.setState({ checkedIds });
  }

  toggleAll = (event: any, checked: boolean) => {
    console.log('befor', this.state.checkedIds);
    const checkedIds = this.props.drills.reduce((a, drill) => ({ ...a, [drill.id]: checked }), {});
    console.log('aft', checkedIds);
    this.setState({ checkedIds });
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
                control={<Checkbox color="primary" />}
                label="Animated"
              />
            </Button>
          </div>
          <ToolsPanel />
        </header>
        <List>
          {this.props.drills.map((value: Drill) => (
            <DrillsItem
              key={value.id}
              onSelect={this.handleToggle}
              drill={value}
              checked={this.state.checkedIds[value.id]}
            />
          ))}
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  drills: getDrillsSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(DrillsBar);
