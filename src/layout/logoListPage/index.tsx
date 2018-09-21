import React, { Component } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { RootState } from 'src/store/rootReducers';
import ItemLogo from 'src/layout/logoListPage/ItemLogo';
import HeaderLogo from 'src/layout/logoListPage/headerLogo';
import { logosActions } from 'src/logos/actions';
import { show } from 'src/modal-juggler/reducer';
import { ModalNames } from 'src/modal-juggler/interface';
import ContentLoader from 'react-content-loader';
import { DeleteLogoModal, AddLogoModal, EditLogoModal } from 'src/layout/logoListPage/modals';
import { LogoModel } from 'src/logos/model';

const styles = (theme: any) =>
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
type modalStateNames = 'deleteModal' | 'addModal' | 'editModal';
type modalState = Record<modalStateNames, boolean>;
const modalState: modalState = {
  deleteModal: false,
  addModal: false,
  editModal: false,
};
const selectedLogo: any      = null;  // fix  change any to LogoModel
const initialState           = { modalState, selectedLogo };

type State = Readonly<typeof modalState & typeof selectedLogo>;
type Props = { classes?: any } & injectDispatchProps & injectStateProps;

class LogoListPage extends Component<Props, State> {
  readonly state = initialState;

  componentDidMount() {
    this.props.logosAction.getLogosRequest();
  }

  render() {
    const { logos, loading } = this.props;
    return (
      <>
        <DeleteLogoModal
          modalName={'deleteModal'}
          open={this.state.modalState.deleteModal}
          item={this.state.selectedLogo}
          close={this.closePopup}
          confirm={this.confirmDelete}
        />
        <AddLogoModal
          modalName={'addModal'}
          open={this.state.modalState.addModal}
          item={this.state.selectedLogo}
          close={this.closePopup}
          confirm={this.confirmAdd}
        />
        <EditLogoModal
          modalName={'editModal'}
          open={this.state.modalState.editModal}
          item={this.state.selectedLogo}
          close={this.closePopup}
          confirm={this.confirmEdit}
        />
        <HeaderLogo addLogo={this.handleAddLogo}/>
        <div className={'container-fluid'}>
          <div className={'row'}>
            {
              loading ? (
                <ContentLoader
                  height={200}
                  width={373}
                  speed={2}
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                >
                  <rect x="0" y="8" rx="0" ry="0" width="55" height="60"/>
                  <rect x="70" y="8" rx="0" ry="0" width="55" height="60"/>
                  <rect x="140" y="8" rx="0" ry="0" width="55" height="60"/>
                  <rect x="210" y="8" rx="0" ry="0" width="55" height="60"/>
                  <rect x="280" y="8" rx="0" ry="0" width="55" height="60"/>
                  <rect x="350" y="8" rx="0" ry="0" width="55" height="60"/>
                </ContentLoader>
              ) : logos.map((item, index) => {
                return (
                  <div className={'col-md-3 col-sm-4 my-logo-item'} key={index}>
                    <ItemLogo
                      item={item}
                      pickDefaultLogo={this.setDefaultLogo}
                      editLogo={this.handleEditLogo}
                      deleteLogo={this.handleDeleteLogo}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }

  openEditPopup = (logo: LogoModel) => {
    this.setState({
      ...this.state,
      selectedLogo: logo,
      modalState: { ...this.state.modalState, editModal: true },
    });
  }

  handleAddLogo = () => {
    this.props.showModal();
  }

  confirmEdit = (payload: { logo: LogoModel, newName: string }) => {
    const logoId = this.state.selectedLogo.id;
    this.props.logosAction.editLogoRequest({ logoId, name: payload.newName });
    this.closePopup('editModal');
  }

  confirmAdd = () => {

  }

  confirmDelete = () => {
    this.props.logosAction.deleteLogosRequest({ logosIds: [this.state.selectedLogo.id] });
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

const mapStateToProps = (state: RootState) => ({
  logos: state.watermarks.logos,
  loading: state.watermarks.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logosAction: bindActionCreators(logosActions, dispatch),
  showModal: () => dispatch(show(ModalNames.addLogo)),
});
type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LogoListPage),
);
