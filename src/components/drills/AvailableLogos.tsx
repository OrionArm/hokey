import { createStyles, Grid, Paper, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { regenerateDrillsRequest } from 'src/store/drils/actions';
import { DrillDetailed } from 'src/store/drils/model';
import { getSelectedDrillSelector } from 'src/store/drils/selectors';
import { logosActions } from 'src/store/logos/actions';
import { RootState } from 'src/store/rootReducers';
import { getUserId } from 'src/store/selectors';
import ItemLogo from '../logos/ItemLogo';

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
  regenerateWithNewLogo = (logoId: string) => {
    if (!this.props.selectedDrill) {
      return;
    }
    this.props.actions.regenerateDrillsRequest(
      [this.props.selectedDrill.id],
      this.props.selectedUserId,
      logoId,
    );
  }
  componentDidMount() {
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
  actions: bindActionCreators({
    ...logosActions,
    regenerateDrillsRequest,
  },                          dispatch),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(AvailableLogos);
