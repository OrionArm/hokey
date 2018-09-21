import React, { Component } from 'react';
import {
  Paper,
  withStyles,
  createStyles,
  Grid,
} from '@material-ui/core';

import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RootState } from '../../store/rootReducers';
import { DrillDetailed } from 'src/drills/model';
import { logosActions } from 'src/logos/actions';
import ItemLogo from '../logoListPage/ItemLogo';
import drillsApi from 'src/drills/api';
import { getSelectedDrillSelector } from 'src/drills/selectors';
import { getUserId } from 'src/store/selectors';

interface DrillsProps {
  classes: any;
  selectedDrill: DrillDetailed | null;
}
type Props = DrillsProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;
interface State {
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

class AvailableLogos extends Component<Props, State> {
  regenerateWithNewLogo = (id: string) => {
    if (!this.props.selectedDrill) {
      return;
    }
    drillsApi.regenerateWithNewLogo(this.props.selectedDrill.id, id, this.props.selectedUserId)
      .then(x => console.log(x));
  }
  componentDidMount() {
    this.props.actions.getLogosRequest();
  }

  public render() {
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
              display: 'flex',
            }}
          >
            Available Logos
          </div>
        </header>
        <Grid
          item
          container
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
            gridGap: 24,
            alignItems: 'stretch',
          }}
        >
          {this.props.logos.map((item, index) => {
            return (
              <Grid item key={index}>
                <ItemLogo
                  item={item}
                  regenerateWithNewLogo={this.regenerateWithNewLogo}
                />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  logos: state.watermarks.logos,
  selectedDrill: getSelectedDrillSelector(state),
  selectedUserId: getUserId(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(logosActions, dispatch),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(AvailableLogos);
