import { createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import LogoHeader from 'src/components/logos/LogoHeader';
import ItemLogo from 'src/components/logos/LogoItem';
import { AddLogoModal, DeleteLogoModal, EditLogoModal } from 'src/components/logos/modals';
import { logosActions } from 'src/store/logos/actions';
import { LogoModel } from 'src/store/logos/model';
import { RootState } from 'src/store/rootReducers';

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
          modalName="deleteModal"
          open={this.state.modalState.deleteModal}
          item={this.state.selectedLogo}
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
          open={this.state.modalState.editModal}
          item={this.state.selectedLogo}
          close={this.closePopup}
          confirm={this.confirmEdit}
        />
        <LogoHeader addLogo={this.openAddPopup}/>
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
                      editLogo={this.openEditPopup}
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

  openAddPopup = () => {
    this.setState({
      ...this.state,
      modalState: { ...this.state.modalState, addModal: true },
    });
  }

  confirmEdit = (payload: { logo: LogoModel, newName: string }) => {
    const logoId = this.state.selectedLogo.id;
    this.props.logosAction.editLogoRequest({ logoId, name: payload.newName });
    this.closePopup('editModal');
  }

  confirmAdd = ({ image, name }) => {
    this.props.addLogo({ image, name });
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

type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: RootState) => ({
  logos: state.watermarks.logos,
  loading: state.watermarks.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logosAction: bindActionCreators(logosActions, dispatch),
  addLogo: (payload: { image: File, name: string }) => dispatch(
    logosActions.addLogosRequest({ image: payload.image, name: payload.name }),
  ),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LogoListPage),
);
