import React, { Component } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid, createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { RootState } from 'src/store/rootReducers';
import ItemLogo from 'src/layout/logoListPage/ItemLogo';
import HeaderLogo from 'src/layout/logoListPage/headerLogo';
import { logosActions } from 'src/logos/actions';
import { show } from 'src/modal-juggler/reducer';
import { ModalNames } from 'src/modal-juggler/interface';
import ContentLoader from 'react-content-loader';
import ConfirmDeleteModal from 'src/components/modals/confirmDelete';

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

type State = Readonly<typeof initialState>;
type Props = { classes?: any } & injectDispatchProps & injectStateProps;
type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;
const initialState = { open: false, logoIdForDeleting: '' };

class LogoListPage extends Component<Props, State> {
  readonly state = initialState;

  componentDidMount() {
    this.props.logosAction.getLogosRequest();
  }

  render() {
    const { logos, loading } = this.props;
    return (
      <>
        <ConfirmDeleteModal
          open={this.state.open}
          close={this.closePopup}
          confirm={this.confirmDelete}
        />
        <HeaderLogo addLogo={this.handleAddLogo}/>
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
                <Grid item key={index}>
                  <ItemLogo
                    item={item}
                    pickDefaultLogo={this.setDefaultLogo}
                    editLogo={this.handleEditLogo}
                    deleteLogo={this.handleDeleteLogo}
                  />
                </Grid>
              );
            })}
        </Grid>
      </>
    );
  }

  handleEditLogo = (logoId: string) => {
    // Now we don't need call this api! We'ill be use redirect
    // this.props.logosAction.setLogosRequest(logoId)
  }

  handleAddLogo = () => {
    this.props.showModal();
  }

  confirmDelete = () => {
    this.props.logosAction.deleteLogosRequest({ logosIds: [this.state.logoIdForDeleting] });
    this.setState({ ...this.state, open: false });
  }

  closePopup = () => {
    this.setState({ ...this.state, open: false });
  }

  handleDeleteLogo = (logoId: string) => {
    this.setState({ ...this.state, logoIdForDeleting: logoId, open: true });
  }

  setDefaultLogo = (logoId: string) => {
    this.props.logosAction.changeDefaultLogoRequest({ logoId });
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LogoListPage),
);
