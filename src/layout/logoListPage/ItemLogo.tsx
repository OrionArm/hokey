import React, { Component } from 'react';
import {
  Typography,
  createStyles,
  FormControlLabel,
  Radio,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = (theme: any) =>
  createStyles({
    root: {
      color: '#fff',
      '&$checked': {
        color: '#fff',
      },
    },
    checked: {},

    labelRadio: {
      color: '#fff',
    },

    card: {
      height: 280,
      position: 'relative',
      width: 225,

      '&:hover $logosHoverBlock': {
        display: 'flex',
      },
    },

    logosHoverBlock: {
      display: 'none',
      width: '100%',
      height: 200,
      backgroundColor: 'rgba(78, 78, 78, 0.5)',
      position: 'absolute',
      top: 0,
      left: 0,
      padding: theme.spacing.unit * 3,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    HoverGroupButton: {
      display: 'inline-flex',
      flexDirection: 'column',
      marginLeft: 'auto',
    },

    media: {
      width: '100%',
      height: 200,
      backgroundColor: '#f1f1f1',
    },
  });

type Props = { classes?: any; item: any };

class LogoListPage extends Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia component="img" className={classes.media} title="log" />
        <div className={classes.logosHoverBlock}>
          <FormControlLabel
            value="Set as Default"
            classes={{
              label: classes.labelRadio,
            }}
            control={
              <Radio
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Set as Default"
          />
          <div className={classes.HoverGroupButton}>
            <Button color="secondary">Edit</Button>
            <Button color="primary">Delete</Button>
          </div>
        </div>
        <CardContent>
          <Typography align="center" variant="headline" component="h2">
            {`${this.props.item} NameLogo`}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(LogoListPage);
