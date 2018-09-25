import React from 'react';
import {
  createStyles,
  FormControlLabel,
  Radio,
  Button,
  CardMedia,
  Typography,
  withStyles,
  Card,
} from '@material-ui/core';
import { LogoModel } from 'src/store/logos/model';
import Mark from 'src/UI/Mark';

const styles = (theme: any) =>
  createStyles({
    rootRadio: {
      color: theme.palette.common.white,
      '&$checkedRadio': {
        color: theme.palette.common.white,
      },
    },
    checkedRadio: {},

    labelRadio: {
      color: theme.palette.common.white,
    },

    card: {
      minHeight: 280,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',

      '&:hover $logoHovering': {
        top: 0,
      },
    },

    logoHovering: {
      transition: '0.7s',
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(78, 78, 78, 0.5)',
      position: 'absolute',
      zIndex: 2,
      top: -500,
      left: 0,
      padding: theme.spacing.unit * 2,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    HoverGroupButton: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 'auto',
      position: 'absolute',
      bottom: '10px',
      right: '10px',
    },
    wrapperImg: {
      flexGrow: 1,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    media: {
      backgroundColor: theme.palette.common.white,
    },
  });

type Props = {
  classes?: any;
  logo: LogoModel;
  pickDefaultLogo?: (logo: LogoModel) => void;
  editLogo?: (logo: LogoModel) => void;
  deleteLogo?: (logo: LogoModel) => void;

  regenerateWithNewLogo?: (logoId: string) => void;
};
const LogoItem: React.SFC<Props> = ({
  classes,
  logo,
  pickDefaultLogo,
  editLogo,
  deleteLogo,
  regenerateWithNewLogo,
}) => {
  const setDefault = pickDefaultLogo ? () => pickDefaultLogo(logo) : null;
  const onEditLogo = editLogo ? () => editLogo(logo) : null;
  const onDeleteLogo = deleteLogo ? () => deleteLogo(logo) : null;

  const onRegenerateWithNewLogo = regenerateWithNewLogo
    ? () => regenerateWithNewLogo(logo.id)
    : null;
  const radioLabel = regenerateWithNewLogo
    ? 'Use this logo for a drill'
    : 'Set as Default';

  return (
    <Card className={classes.card}>
      <div className={classes.wrapperImg}>
        <CardMedia
          component="img"
          className={classes.media}
          title={logo.name}
          image={logo.url}
        />
        <div className={classes.logoHovering}>
          <FormControlLabel
            value={radioLabel}
            classes={{
              label: classes.labelRadio,
            }}
            checked={regenerateWithNewLogo ? false : logo.isMain}
            control={
              <Radio
                classes={{
                  root: classes.rootRadio,
                  checked: classes.checkedRadio,
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
      </div>

      <Typography
        style={{ padding: 8 }}
        align="center"
        variant="headline"
        component="h4"
      >
        {clearName(logo.name)}
      </Typography>

      {logo.isMain && <Mark textContent="default" />}
    </Card>
  );
};

function clearName(name: string) {
  return name.replace(/.png/gi, '');
}

export default withStyles(styles)(LogoItem);
