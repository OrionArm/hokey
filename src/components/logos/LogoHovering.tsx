import React from 'react';
import {
  createStyles,
  FormControlLabel,
  Radio,
  Button,
  withStyles,
  Theme,
  WithStyles,
  Slide,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { LogoModel } from 'src/store/logos/model';

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
    <Slide direction="down" in>
      <div className={`${classes.logoHovering} logo-hovering`}>
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
                icon={faTimesCircle}
              />
            </Button>
          )}
        </div>
      </div>
    </Slide>
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

    logoHovering: {
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(78, 78, 78, 0.5)',
      position: 'absolute',
      zIndex: 2,
      top: 0,
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

    label: {
      color: theme.palette.common.white,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    svg: {
      position: 'absolute',
      right: -2,
      width: '18px !important',
      height: '18px !important',
    },
  });

export default withStyles(styles, { withTheme: true })(LogoItem);
