import React, { Component } from 'react';
import {
  Grid,
  Typography,
  createStyles,
  Button,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
interface ILogoListProps {
  classes?: any;
}

class LogoList extends Component<ILogoListProps> {
  state = {
    checked: false,
  };
  render() {
    const { classes } = this.props;

    return (
      <>
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
}

export default withStyles(styles)(LogoList);
