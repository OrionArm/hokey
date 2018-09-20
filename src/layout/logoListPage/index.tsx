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

type Props = { classes?: any } & injectDispatchProps & injectStateProps;
type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;

class LogoListPage extends Component<Props, any> {
  componentDidMount() {
    this.props.logosAction.getLogosRequest();
  }

  render() {
    const { logos } = this.props;
    return (
      <>
        <Grid
          item
          container
          justify="space-between"
          md={12}
          style={{ marginBottom: 16 }}
        >
          <HeaderLogo addLogo={this.handleAddLogo} />
        </Grid>
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
          {logos.map((item, index) => {
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

  handleDeleteLogo = (logoId: string) => {
    this.props.logosAction.deleteLogosRequest({ logosIds: [logoId] });
  }

  setDefaultLogo = (logoId: string) => {
    this.setState({ defaultLogo: logoId });
    this.props.logosAction.changeDefaultLogoRequest({ logoId });
  }

}

const mapStateToProps = (state: RootState) => ({
  logos: state.watermarks.logos,
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
