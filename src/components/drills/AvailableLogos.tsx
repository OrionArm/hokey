import {
  createStyles,
  Grid,
  withStyles,
  Typography,
  Paper,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { regenerateDrillsRequest } from 'src/store/drils/actions';
import { DrillDetailed } from 'src/store/drils/model';
import { getSelectedDrillSelector } from 'src/store/drils/selectors';
import { logosActions } from 'src/store/logos/actions';
import { RootState } from 'src/store/rootReducers';
import { getUserId } from 'src/store/selectors';
import ItemLogo from '../logos/LogoItem';

type Props = {
  classes: any;
  selectedDrill: DrillDetailed | null;
} & ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;
type State = {}

const mapStateToProps    = (state: RootState) => ({
  logos: state.watermarks.logos,
  selectedDrill: getSelectedDrillSelector(state),
  selectedUserId: getUserId(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      ...logosActions,
      regenerateDrillsRequest,
    },
    dispatch,
  ),
});

class AvailableLogos extends Component<Props, State> {
  public render() {
    return (
      <Slide direction="up" in>
        <Paper component="section" style={{ padding: 24 }}>
          <Grid container spacing={24} direction="column">
            <Grid item>
              <Typography variant="title" color="primary" component="h4">
                Available Logos
              </Typography>
            </Grid>
            {
              this.props.logos.map(logo => {
                return (
                  <Grid item key={logo.id}>
                    <ItemLogo
                      logo={logo}
                      regenerateWithNewLogo={this.regenerateWithNewLogo}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </Paper>
      </Slide>
    );
  }
  regenerateWithNewLogo = (logoId: string) => {
    if (!this.props.selectedDrill) {
      return;
    }

    this.props.actions.regenerateDrillsRequest({
      logoId,
      drill_ids: [this.props.selectedDrill.id],
      userId: this.props.selectedUserId,
    });
  }
}

const styles = createStyles({});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AvailableLogos);
