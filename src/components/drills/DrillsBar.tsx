import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import ContentLoader from 'react-content-loader';
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

import { NormDrills } from 'src/store/drils/model';
import {
  getDrillsSelector,
  getLoadingData,
  getSelectedDrillSelector,
} from 'src/store/drils/selectors';
import { RootState } from 'src/store/rootReducers';
import { getUserId } from 'src/store/selectors';
import {
  getDrillRequest,
  regenerateDrillsRequest,
  downloadDrillsRequest,
} from 'src/store/drils/actions';

import DrillsItem from './DrillsItem';
import ToolsPanel from './ToolsPanel';

type State = Readonly<{ checkedIds: { [id: string]: boolean } }>;
type Props = WithStyles<typeof styles> & injectDispatchProps & injectStateProps;

const mapStateToProps    = (state: RootState) => ({
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

class DrillsBar extends Component<Props, State> {
  readonly state = {
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
    const checkedIds = toggleDrills(
      {
        checked,
        drills: this.props.drills.data,
        checkedIds: this.state.checkedIds,
      },
    );

    this.setState({ checkedIds });
  }

  toggleAnimated = (event: any, checked: boolean) => {
    const checkedIds = toggleDrills(
      {
        checked,
        drills: this.props.drills.data,
        filter: 'hasAnimation',
        checkedIds: this.state.checkedIds,
      },
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
          }         = this.props;
    const drillsIds = Object.keys(drills.data);

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
                control={<Checkbox color="primary"/>}
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
                control={<Checkbox color="primary"/>}
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
        {
          !drills.loading && drills
            ?
            <List style={{ padding: 0 }}>
              {
                drillsIds.map((id: string) => (
                  <DrillsItem
                    key={id}
                    onCheck={this.handleToggle(id)}
                    drill={drills.data[id]}
                    checked={this.state.checkedIds[id]}
                    selectDrill={actions.selectDrill}
                    isSelected={this.isDrillSelected(id)}
                  />
                ))
              }
            </List>
            :
            <ContentLoader
              height={100}
              width={373}
              speed={2}
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="5.5" y="5" rx="0" ry="0" width="365" height="10"/>
              <rect x="5.5" y="25" rx="0" ry="0" width="365" height="10"/>
              <rect x="5.5" y="45" rx="0" ry="0" width="365" height="10"/>
              <rect x="5.5" y="65" rx="0" ry="0" width="365" height="10"/>
              <rect x="5.5" y="85" rx="0" ry="0" width="365" height="10"/>
            </ContentLoader>
        }
      </Paper>
    );
  }
}

function toggleDrills(payload: {
  drills: NormDrills,
  checked: boolean,
  checkedIds: State['checkedIds'],
  filter?: string,
}): State['checkedIds'] {
  const drills                = payload.drills;
  const checked               = payload.checked;
  const checkedIds            = payload.checkedIds;
  const drillIdList: string[] = Object.keys(drills);
  const filter                = payload.filter;
  return drillIdList.reduce(
    (acc, drillId) => {
      let filtered;
      if (filter === 'hasAnimation') {
        filtered = drills[drillId].hasAnimation;
      } else {
        filtered = true;
      }
      if (filtered) {
        acc[drillId] = checked;
        return acc;
      }
      return acc;
    },
    checkedIds,
  );
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
type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DrillsBar);
