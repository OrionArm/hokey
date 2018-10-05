import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { bindActionCreators, Dispatch, compose } from 'redux';

import { regenerateDrillsRequest } from 'src/store/drils/actions';
import { DrillDetailed } from 'src/store/drils/model';
import { getSelectedDrillSelector } from 'src/store/drils/selectors';
import { RootState } from 'src/store/rootReducers';
import { getUserId } from 'src/store/selectors';
import toastActions, { ToastType } from 'src/store/toast/actions';
import {
  hasUserProAccessSelector,
  isUserAnAdminSelector,
} from 'src/store/user/store/selectors';
import ConfirmChangeLogoModal from 'src/components/drills/modals/ConfirmChangeLogoModal';
import AvailableLogos from './AvailableLogos';
import CategoriesBar from './CategoriesBar';
import DetailsBar from './DetailsBar';
import DrillsBar from './DrillsBar';
import HoveringLogo from '../commons/HocHoveringLogo';

const mapStateToProps = (state: RootState) => ({
  showLogoBar: hasUserProAccessSelector(state) || isUserAnAdminSelector(state),
  selectDrill: getSelectedDrillSelector(state),
  logos: state.watermarks.logos,
  selectedUserId: getUserId(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  drillsActions: bindActionCreators(regenerateDrillsRequest, dispatch),
  toastActions: bindActionCreators(toastActions, dispatch),
});

type Props = {
  selectedDrill: DrillDetailed | null;
  isHoverOpen: null | string;
  handleHover: (id: string) => void;
} & ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;
type State = Readonly<typeof initialState>;
const initialState = { openModal: false, selectedLogoId: '', selectedTab: 0 };

class DrillsPage extends React.Component<Props, State> {
  readonly state = initialState;
  public render() {
    const { selectDrill, logos } = this.props;
    return (
      <>
        <Typography
          style={{ marginBottom: 16, flexGrow: 1 }}
          variant="headline"
        >
          My Drills
        </Typography>
        <Grid container wrap="nowrap" spacing={8} justify="space-between">
          <Grid item md={3} style={{ minWidth: 270 }}>
            <CategoriesBar />
          </Grid>
          <Grid item style={{ flexGrow: 1 }}>
            <DrillsBar />
          </Grid>
          {selectDrill ? (
            <Grid item md={3}>
              <DetailsBar
                selectedTab={this.state.selectedTab}
                onTabChange={this.onTabChange}
              />
              {this.state.selectedTab === 2 && (
                <AvailableLogos
                  isHoverOpen={this.props.isHoverOpen}
                  handleHover={this.props.handleHover}
                  logos={logos}
                  regenerateWithNewLogo={this.regenerateWithNewLogo}
                  selectedDrill={selectDrill}
                />
              )}
            </Grid>
          ) : null}
        </Grid>
        <ConfirmChangeLogoModal
          open={this.state.openModal}
          confirm={this.handleConfirm}
          close={this.handleClose}
        />
      </>
    );
  }
  private onTabChange = (selectedTab: number) => this.setState({ selectedTab });

  private handleClose = () => this.setState({ openModal: false });

  private handleConfirm = () => {
    const {
      drillsActions,
      selectDrill,
      selectedUserId,
      toastActions,
    } = this.props;
    this.setState({ openModal: false });
    if (selectDrill && drillsActions && selectedUserId) {
      drillsActions({
        logoId: this.state.selectedLogoId,
        drill_ids: [selectDrill.id],
        userId: selectedUserId,
      });
    } else {
      const message = "Can't start generate drill";
      const type = ToastType.Warning;
      toastActions.showToast(message, type);
    }
  }

  regenerateWithNewLogo = (logoId: string) => {
    this.setState({ openModal: true, selectedLogoId: logoId });
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  HoveringLogo,
)(DrillsPage);
