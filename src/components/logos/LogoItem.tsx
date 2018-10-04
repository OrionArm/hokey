import React from 'react';
import {
  createStyles,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  withStyles,
  Card,
  Theme,
  WithStyles,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { LogoModel } from 'src/store/logos/model';
import { Mark } from 'src/UI/';
import { WrapperLogoImg } from 'src/UI';

type Props = {
  theme: Theme;
  logo: LogoModel;
  pickDefaultLogo?: (logo: LogoModel) => void;
  editLogo?: (logo: LogoModel) => void;
  deleteLogo?: (logo: LogoModel) => void;
  regenerateWithNewLogo?: (logoId: string) => void;
} & WithStyles<typeof styles>;
const LogoItem: React.SFC<Props> = ({
  classes,
  theme,
  logo,
  pickDefaultLogo,
  editLogo,
  deleteLogo,
  regenerateWithNewLogo,
  children,
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
    <>
      <Card component="figure" className={classes.card}>
        <WrapperLogoImg>
          <img className={classes.media} title={logo.name} src={logo.url} />
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
                <Button
                  classes={{
                    label: classes.label,
                  }}
                  onClick={onEditLogo}
                >
                  Edit
                  <FontAwesomeIcon
                    style={{
                      color: theme.palette.secondary.main,
                    }}
                    className={classes.svg}
                    icon={faEdit}
                  />
                </Button>
              )}
              {onDeleteLogo && (
                <Button
                  onClick={onDeleteLogo}
                  classes={{
                    label: classes.label,
                  }}
                >
                  Delete
                  <FontAwesomeIcon
                    style={{
                      color: theme.palette.primary.main,
                    }}
                    className={classes.svg}
                    icon={faTrash}
                  />
                </Button>
              )}
            </div>
          </div>
        </WrapperLogoImg>
        <Typography
          style={{ padding: 8, wordWrap: 'break-word' }}
          align="center"
          variant="headline"
          component="figcaption"
        >
          {logo.name}
        </Typography>
        {logo.isMain && <Mark textContent="default" />}
      </Card>
      {children ? children : null}
    </>
  );
};

const styles = (theme: Theme) =>
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
      fontSize: 18,
      lineHeight: '27px',
    },

    card: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 0,
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
      borderRadius: 4,
    },

    HoverGroupButton: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 'auto',
      position: 'absolute',
      bottom: '10px',
      right: '10px',
    },
    media: {
      backgroundColor: theme.palette.common.white,
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    label: {
      color: theme.palette.common.white,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    svg: {
      position: 'absolute',
      right: 0,
    },
  });

export default withStyles(styles, { withTheme: true })(LogoItem);
