import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Grid,
  Typography,
  createStyles,
  Button,
  FormControlLabel,
  Radio,
  CardMedia,
  CardContent,
  Card,
} from '@material-ui/core';

import MainMenu from 'src/components/mainMenu/MainMenu';
import { IRootReducer } from 'src/store/rootReducers';
import { logosActions } from 'src/logos/actions';

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
type Props = { classes?: any; } & injectProps;
type injectProps = ReturnType<typeof mapDispatchToProps>;
const initialState = { checked: false };

class LogoListPage extends Component<Props, State> {
  state = initialState;

  componentDidMount() {
    this.props.logosAction.getLogosRequest();
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <MainMenu/>
        <Grid item container justify="space-between" md={12}>
          <Typography variant="headline">My Logos</Typography>
          <Button variant="contained" color="primary">
            new logos
          </Button>
        </Grid>

        <Grid item container spacing={24}>
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
            return (
              <Grid item md={2} key={index}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.media}
                    title="log"
                  />
                  <div className={classes.logosHoverBlock}>
                    <FormControlLabel
                      value="Set as Default"
                      control={
                        <Radio
                          classes={{
                            root: classes.root,
                            checked: classes.checked,
                            colorPrimary: classes.colorPrimary,
                            colorSecondary: classes.colorSecondary,
                          }}
                          onChange={this.setDefaultLogo}
                        />
                      }
                      label="Set as Default"
                    />
                    <div style={{ textAlign: 'right' }}>
                      <div>Edit</div>
                      <div>Delete</div>
                    </div>
                  </div>
                  <CardContent>
                    <Typography
                      align="center"
                      variant="headline"
                      component="h2"
                    >
                      {`${item} NameLogo`}
                    </Typography>
                  </CardContent>
                </Card>
                ;
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

const mapStateToProps = (state: IRootReducer) => ({
  // logos: state.logos,
});

const mapDispatchToProps = (state: Dispatch) => ({
  logosAction: bindActionCreators(logosActions, state),
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(LogoListPage),
);
