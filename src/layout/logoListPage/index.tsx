import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Grid,
  createStyles,
} from '@material-ui/core';

import { RootState } from 'src/store/rootReducers';
import ItemLogo from 'src/layout/logoListPage/ItemLogo';
import HeaderLogo from 'src/layout/logoListPage/headerLogo';
import { logosActions } from 'src/logos/actions';

const styles = (theme: any) => createStyles(
  {
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
  },
);

type State = Readonly<typeof initialState>;
type Props = { classes?: any; } & injectProps;
type injectProps = ReturnType<typeof mapDispatchToProps>;
const initialState = { checked: false };

class LogoListPage extends Component<Props, State> {
  readonly state = initialState;

  componentDidMount() {
    this.props.logosAction.getLogosRequest();
  }

  render() {
    return (
      <>
        <Grid item container justify="space-between" md={12}>
          <HeaderLogo/>
        </Grid>
        <Grid
          item
          container
          spacing={24}
          style={{ justifyContent: 'space-between' }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
            return (
              <Grid item key={index}>
                <ItemLogo item={item}/>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }

  setDefaultLogo = () => {
    // this.props.logosAction.changeDefaultLogoRequest(logo);
  }

  // deleteLogo = (logo) => {
  //   this.props.logosAction.deleteLogosRequest(logo);
  // };
  //
  // addLogo = (logo) => {
  //   this.props.logosAction.setLogosRequest(logo);
  // };
}

const mapStateToProps = (state: RootState) => ({
  // logos: state.logos,
});

const mapDispatchToProps = (state: Dispatch) => ({
  logosAction: bindActionCreators(logosActions, state),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(LogoListPage),
);
