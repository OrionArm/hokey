import React from 'react';
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
import { LogoModel } from 'src/logos/model';

const styles = (theme: any) =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      '&$checked': {
        color: theme.palette.common.white,
      },
    },
    checked: {},

    labelRadio: {
      color: theme.palette.common.white,
    },

    card: {
      height: 280,
      position: 'relative',
      width: 225,

      '&:hover $logosHoverBlock': {
        top: 0,
      },
    },

    logosHoverBlock: {
      transition: '0.7s',
      display: 'flex',
      width: '100%',
      height: 200,
      backgroundColor: 'rgba(78, 78, 78, 0.5)',
      position: 'absolute',
      top: -500,
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
    mark: {
      position: 'absolute',
      top: 20,
      right: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      paddingRight: 15,
      height: 30,
      zIndex: 2,
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: -15,
        transform: 'skew(45deg)',
        width: 30,
        height: 15,
        backgroundColor: theme.palette.primary.main,
        zIndex: -1,
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 15,
        left: -15,
        transform: 'skew(-45deg)',
        width: 30,
        height: 14.5,
        backgroundColor: theme.palette.primary.main,
        zIndex: -1,
      },
    },
  });

type Props = {
  classes?: any;
  item: LogoModel;
  pickDefaultLogo?: (logoId: string) => void;
  editLogo?: (logoId: string) => void;
  deleteLogo?: (logoId: string) => void;

  regenerateWithNewLogo?: (logoId: string) => void;
};
const LogoItem: React.SFC<Props> = ({
  classes,
  item,
  pickDefaultLogo,
  editLogo,
  deleteLogo,
  regenerateWithNewLogo,
}) => {
  const setDefault = pickDefaultLogo ? () => pickDefaultLogo(item.id) : null;
  const onEditLogo = editLogo ? () => editLogo(item.id) : null;
  const onDeleteLogo = deleteLogo ? () => deleteLogo(item.id) : null;

  const onRegenerateWithNewLogo = regenerateWithNewLogo
    ? () => regenerateWithNewLogo(item.id)
    : null;
  const radioLabel = regenerateWithNewLogo
    ? 'Use this logo for a drill'
    : 'Set as Default';

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        className={classes.media}
        title="log"
        image={item.url}
      />
      <div className={classes.logosHoverBlock}>
        <FormControlLabel
          value={radioLabel}
          classes={{
            label: classes.labelRadio,
          }}
          checked={regenerateWithNewLogo ? false : item.isMain}
          control={
            <Radio
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
              onChange={(onRegenerateWithNewLogo || setDefault) as any}
            />
          }
          label={radioLabel}
        />
        <div className={classes.HoverGroupButton}>
          {onEditLogo && (
            <Button color="secondary" onClick={onEditLogo}>
              Edit
            </Button>
          )}
          {onDeleteLogo && (
            <Button color="primary" onClick={onDeleteLogo}>
              Delete
            </Button>
          )}
        </div>
      </div>
      <CardContent>
        <Typography align="center" variant="headline" component="h2">
          {clearName(item.name)}
        </Typography>
      </CardContent>
      <div className={classes.mark}>default</div>
    </Card>
  );
};

function clearName(name: string) {
  return name.replace(/.png/gi, '');
}

export default withStyles(styles)(LogoItem);
