import { createStyles, Theme, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import {
  AddLogoModal,
  DeleteLogoModal,
  EditLogoModal,
} from 'src/components/logos/modals';
import { logosActions } from 'src/store/logos/actions';
import { LogoModel } from 'src/store/logos/model';
import { RootState } from 'src/store/rootReducers';
import LogoItem from './LogoItem';
import LogoHeader from './LogoHeader';

type modalStateNames = 'deleteModal' | 'addModal' | 'editModal';
type modalState = Record<modalStateNames, boolean>;
const modalState: modalState = {
  deleteModal: false,
  addModal: false,
  editModal: false,
};
const selectedLogo: any = null; // fix  change any to LogoModel

type State = Readonly<typeof initialState>;
type Props = WithStyles<typeof styles> & injectDispatchProps & injectStateProps;

const mapStateToProps = (state: RootState) => ({
  logos: state.watermarks.logos,
  loading: state.watermarks.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logosAction: bindActionCreators(logosActions, dispatch),
  addLogo: (payload: { image: File; name: string }) =>
    dispatch(
      logosActions.addLogosRequest({ image: payload.image, name: payload.name }),
    ),
});

const initialState = { modalState, selectedLogo, isHoverOpen: null };

class LogoListPage extends Component<Props, State> {
  readonly state = initialState;

  componentDidMount() {
    this.props.logosAction.getLogosRequest();
  }

  render() {
    const { loading, logos } = this.props;
    const logosIds: string[] = Object.keys(logos);

    return (
      <>
        <DeleteLogoModal
          modalName="deleteModal"
          item={this.state.selectedLogo}
          open={this.state.modalState.deleteModal}
          close={this.closePopup}
          confirm={this.confirmDelete}
        />
        <AddLogoModal
          modalName="addModal"
          item={this.state.selectedLogo}
          open={this.state.modalState.addModal}
          close={this.closePopup}
          confirm={this.confirmAdd}
        />
        <EditLogoModal
          modalName="editModal"
          item={this.state.selectedLogo}
          open={this.state.modalState.editModal}
          close={this.closePopup}
          confirm={this.confirmEdit}
        />
        <LogoHeader addLogo={this.openAddPopup} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
            gridGap: 24,
            width: '100%',
            alignItems: 'stretch',
          }}
        >
          {loading ? (
            <ContentLoader
              height={200}
              width={373}
              speed={2}
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="0" y="8" rx="0" ry="0" width="55" height="60" />
              <rect x="70" y="8" rx="0" ry="0" width="55" height="60" />
              <rect x="140" y="8" rx="0" ry="0" width="55" height="60" />
              <rect x="210" y="8" rx="0" ry="0" width="55" height="60" />
              <rect x="280" y="8" rx="0" ry="0" width="55" height="60" />
              <rect x="350" y="8" rx="0" ry="0" width="55" height="60" />
            </ContentLoader>
          ) : (
            logosIds.map(id => {
              return (
                <LogoItem
                  key={`${id}_${logos[id].name}`}
                  isHoverOpen={this.state.isHoverOpen === id}
                  onHoverHandle={() => this.handleHover(id)}
                  logo={logos[id]}
                  pickDefaultLogo={this.setDefaultLogo}
                  editLogo={this.openEditPopup}
                  deleteLogo={this.handleDeleteLogo}
                />
              );
            })
          )}
        </div>
      </>
    );
  }

  handleHover = hoveringLogo =>
    this.setState({
      isHoverOpen: hoveringLogo,
    })

  openEditPopup = (logo: LogoModel) => {
    this.setState({
      ...this.state,
      selectedLogo: logo,
      modalState: { ...this.state.modalState, editModal: true },
    });
  }

  openAddPopup = () => {
    this.setState({
      ...this.state,
      modalState: { ...this.state.modalState, addModal: true },
    });
  }

  confirmEdit = (payload: { logo: LogoModel; newName: string }) => {
    const logoId = this.state.selectedLogo.id;
    this.props.logosAction.editLogoRequest({ logoId, name: payload.newName });
    this.closePopup('editModal');
  }

  confirmAdd = ({ image, name }) => {
    this.props.addLogo({ image, name });
  }

  confirmDelete = () => {
    this.props.logosAction.deleteLogosRequest({
      logosIds: [this.state.selectedLogo.id],
    });
    this.closePopup('deleteModal');
  }

  closePopup = (modalname: string) => {
    this.setState({
      ...this.state,
      modalState: { ...this.state.modalState, [modalname]: false },
      selectedLogo: null,
    });
  }

  handleDeleteLogo = (logo: LogoModel) => {
    this.setState({
      ...this.state,
      selectedLogo: logo,
      modalState: { ...this.state.modalState, deleteModal: true },
    });
  }

  setDefaultLogo = (logo: LogoModel) => {
    this.props.logosAction.changeDefaultLogoRequest({ logoId: logo.id });
  }
}

const styles = (theme: Theme) =>
  createStyles({
    checked: {
      color: '#fff',
      background: '#fff',
    },

    card: {
      height: 280,
      position: 'relative',
      // '&:hover $logosHoverBlock': {
      //   display: 'block',
      // },
    },
    logosHoverBlock: {
      width: '100%',
      height: 200,
      backgroundColor: '#4e4e4e',
      position: 'absolute',
      top: 0,
      left: 0,
      padding: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    media: {
      width: '100%',
      height: 200,
      backgroundColor: '#f1f1f1',
    },
  });

type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false },
  ),
)(LogoListPage);
