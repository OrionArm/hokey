// tslint:disable-next-line:max-line-length
import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  List,
  Paper,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import ContentLoader from 'react-content-loader';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import {
  getDrillRequest,
  regenerateDrillsRequest,
  downloadDrillsRequest,
} from 'src/store/drils/actions';
import { Drill, DrillDetailed, DownloadDrill } from 'src/store/drils/model';
import { getUserId } from 'src/store/selectors';
import {
  getDrillsSelector,
  getSelectedDrillSelector,
  getLoadingData,
} from '../../store/drils/selectors';
import { RootState } from '../../store/rootReducers';
import DrillsItem from './DrillsItem';
import ToolsPanel from './ToolsPanel';

interface DrillsProps extends WithStyles<typeof styles> {
  drills: { loading: boolean; data: Drill[] };
  loadingData: DownloadDrill;
  actions: {
    selectDrill: typeof getDrillRequest;
    regenerateDrillsRequest: typeof regenerateDrillsRequest;
    downloadDrillsRequest: typeof downloadDrillsRequest;
  };
  selectedDrill: DrillDetailed | null;
  selectedUserId: string;
}

interface State {
  checkedIds: { [id: string]: boolean };
  // drills: Drill[];
}

class DrillsBar extends Component<DrillsProps, State> {
  state = {
    checkedIds: {},
  };

  get checkedIdsAsArray() {
    return Object.keys(this.state.checkedIds).filter(
      id => this.state.checkedIds[id],
    );
  }

  handleToggle = (id: string) => () => {
    const checkedIds = {
      ...this.state.checkedIds,
      [id]: !this.state.checkedIds[id],
    };
    this.setState({ checkedIds });
  }

  toggleAll = (event: any, checked: boolean) => {
    const checkedIds = this.props.drills.data.reduce(
      (a, drill) => ({ ...a, [drill.id]: checked }),
      {},
    );
    this.setState({ checkedIds });
  }

  toggleAnimated = (event: any, checked: boolean) => {
    const checkedIds = this.props.drills.data
      .filter(drill => drill.has_animation)
      .reduce(
        (a, drill) => ({ ...a, [drill.id]: checked }),
        this.state.checkedIds,
      );
    this.setState({ checkedIds });
  }

  isDrillSelected = (id: string) => {
    return this.props.selectedDrill
      ? this.props.selectedDrill.id === id
      : false;
  }

  public render() {
    const {
      classes,
      drills,
      selectedUserId,
      actions,
      loadingData,
    } = this.props;

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
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              borderBottomRightRadius: 4,
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
              style={{
                borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: 0,
                borderBottomRightRadius: 4,
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
          <ToolsPanel
            checkedIds={this.checkedIdsAsArray}
            selectedUserId={selectedUserId}
            regenerateDrillsRequest={actions.regenerateDrillsRequest}
            downloadDrillsRequest={actions.downloadDrillsRequest}
            loadingData={loadingData}
          />
        </header>

        {!drills.loading ? (
          <List style={{ padding: 0 }}>
            {drills.data.map((drill: Drill) => (
              <DrillsItem
                key={drill.id}
                onCheck={this.handleToggle(drill.id)}
                drill={drill}
                checked={this.state.checkedIds[drill.id]}
                selectDrill={actions.selectDrill}
                isSelected={this.isDrillSelected(drill.id)}
              />
            ))}
          </List>
        ) : (
          <ContentLoader
            height={100}
            width={373}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="5.5" y="5" rx="0" ry="0" width="365" height="10" />
            <rect x="5.5" y="25" rx="0" ry="0" width="365" height="10" />
            <rect x="5.5" y="45" rx="0" ry="0" width="365" height="10" />
            <rect x="5.5" y="65" rx="0" ry="0" width="365" height="10" />
            <rect x="5.5" y="85" rx="0" ry="0" width="365" height="10" />
          </ContentLoader>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  loadingData: getLoadingData(state),
  drills: getDrillsSelector(state),
  selectedDrill: getSelectedDrillSelector(state),
  selectedUserId: getUserId(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      regenerateDrillsRequest,
      downloadDrillsRequest,
      selectDrill: getDrillRequest,
    },
    dispatch,
  ),
});

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

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DrillsBar);
