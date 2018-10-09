import produce from 'immer';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { bindActionCreators, Dispatch, compose } from 'redux';
import NeedGenerateDrillModal from 'src/components/drills/modals/NeedGenerateDrillModal';

import { regenerateDrillsRequest } from 'src/store/drils/actions';
import { DrillDetailed } from 'src/store/drils/model';
import { getSelectedDrillSelector } from 'src/store/drils/selectors';
import { RootState } from 'src/store/rootReducers';
import toastActions, { ToastType } from 'src/store/toast/actions';
import {
  getUserId,
  userProAccessSelector,
  userAdminAccessSelector,
} from 'src/store/user/store/selectors';
import ConfirmChangeLogoModal from 'src/components/drills/modals/ConfirmChangeLogoModal';
import AvailableLogos from './AvailableLogos';
import CategoriesBar from './CategoriesBar';
import DetailsBar from './DetailsBar';
import DrillsBar from './DrillsBar';
import HoveringLogo from '../commons/HocHoveringLogo';

enum modalNames {
  'ConfirmChangeLogoModal' = 'ConfirmChangeLogoModal',
  'NeedGenerateDrillModal' = 'NeedGenerateDrillModal',
}
type modalState = {[ modalName in modalNames ]: boolean};
const modalState: modalState = {
  [modalNames.ConfirmChangeLogoModal]: false,
  [modalNames.NeedGenerateDrillModal]: false,
};

const mapStateToProps    = (state: RootState) => ({
  showLogoBar: userProAccessSelector(state) || userAdminAccessSelector(state),
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
const initialState = { modalState, selectedLogoId: '', selectedTab: 0 };

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
            <CategoriesBar/>
          </Grid>
          <Grid item style={{ flexGrow: 1 }}>
            <DrillsBar/>
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
          modalName={modalNames.ConfirmChangeLogoModal}
          open={this.state.modalState[modalNames.ConfirmChangeLogoModal]}
          confirm={this.handleConfirm}
          close={this.handleClose}
        />
        <NeedGenerateDrillModal
          modalName={modalNames.NeedGenerateDrillModal}
          open={this.state.modalState[modalNames.NeedGenerateDrillModal]}
          close={this.handleClose}
        />
      </>
    );
  }

  private onTabChange = (selectedTab: number) => this.setState({ selectedTab });

  private handleClose = (modalName: string) => this.setState(
    produce<State>(draft => {
      draft.modalState[modalName] = false;
    }),
  )

  private handleConfirm = () => {
    const {
            drillsActions,
            selectDrill,
            selectedUserId,
            toastActions,
          } = this.props;
    this.setState(
      produce<State>(draft => {
        Object.keys(draft.modalState)
          .map(modelName => draft.modalState[modelName] = false);
      }),
    );
    if (selectDrill && drillsActions && selectedUserId) {
      drillsActions({
        logoId: this.state.selectedLogoId,
        drill_ids: [selectDrill.id],
        userId: selectedUserId,
      });
    } else {
      const message = 'Can\'t start generate drill';
      const type    = ToastType.Warning;
      toastActions.showToast(message, type);
    }
  }

  regenerateWithNewLogo = (logoId: string) => {
    if (this.props.selectDrill && this.props.selectDrill.animation) {
      this.setState(
        produce<State>(draft => {
          draft.modalState[modalNames.ConfirmChangeLogoModal] = true;
          draft.selectedLogoId                       = logoId;
        }),
      );
    } else {
      this.setState(
        produce<State>(draft => {
          draft.modalState[modalNames.NeedGenerateDrillModal] = true;
        }),
      );
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  HoveringLogo,
)(DrillsPage);
