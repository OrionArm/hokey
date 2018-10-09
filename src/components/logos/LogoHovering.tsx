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
import ClickOutHandler from 'react-onclickout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { LogoModel } from 'src/store/logos/model';

type Props = {
  theme: Theme;
  logo: LogoModel;
  pickDefaultLogo?: (logo: LogoModel) => void;
  editLogo?: (logo: LogoModel) => void;
  deleteLogo?: (logo: LogoModel) => void;
  regenerateWithNewLogo?: (logoId: string) => void;
  closeHover: () => null;
} & WithStyles<typeof styles>;

const onClickOut = (e, closeHover) => {
  return closeHover();
};

const LogoItem: React.SFC<Props> = ({
  classes,
  logo,
  pickDefaultLogo,
  editLogo,
  deleteLogo,
  regenerateWithNewLogo,
  closeHover,
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
      <ClickOutHandler onClickOut={e => onClickOut(e, closeHover)}>
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
                <div className={`${classes.wrapperSvg} ${classes.wrapperEdit}`}>
                  <FontAwesomeIcon className={classes.svg} icon={faPen} />
                </div>
              </Button>
            )}
            {onDeleteLogo && (
              <Button
                onClick={onDeleteLogo}
                classes={{
                  label: classes.label,
                }}
              >
                <div
                  className={`${classes.wrapperSvg} ${classes.wrapperDelete}`}
                >
                  <FontAwesomeIcon className={classes.svg} icon={faTimes} />
                </div>
                Delete
              </Button>
            )}
          </div>
        </div>
      </ClickOutHandler>
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
    wrapperSvg: {
      position: 'absolute',
      width: '20px !important',
      height: '20px !important',
      right: -4,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapperEdit: {
      backgroundColor: theme.palette.secondary.main,
    },
    wrapperDelete: {
      backgroundColor: theme.palette.error.main,
    },
    svg: {
      width: '12px !important',
      height: '12px !important',
      // backgroundColor: 'red',
      color: theme.palette.common.white,
    },
  });

export default withStyles(styles, { withTheme: true })(LogoItem);
