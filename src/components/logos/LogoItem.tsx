import React from 'react';
import {
  createStyles,
  Typography,
  withStyles,
  Card,
  Theme,
  WithStyles,
} from '@material-ui/core';

import { LogoModel } from 'src/store/logos/model';
import { Mark } from 'src/UI/';
import { WrapperLogoImg } from 'src/UI';
import LogoHovering from './LogoHovering';

type Props = {
  theme: Theme;
  logo: LogoModel;
  isHoverOpen?: boolean | null;
  onHoverHandle?: any;
  pickDefaultLogo?: (logo: LogoModel) => void;
  editLogo?: (logo: LogoModel) => void;
  deleteLogo?: (logo: LogoModel) => void;
  regenerateWithNewLogo?: (logoId: string) => void;
} & WithStyles<typeof styles>;
const LogoItem: React.SFC<Props> = ({
  classes,
  logo,
  children,
  isHoverOpen,
  onHoverHandle,
  editLogo,
  deleteLogo,
  pickDefaultLogo,
}) => {
  return (
    <>
      <Card component="figure" className={classes.card} onClick={onHoverHandle}>
        <WrapperLogoImg>
          <img className={classes.media} title={logo.name} src={logo.url} />
          {isHoverOpen && (
            <LogoHovering
              logo={logo}
              editLogo={editLogo}
              deleteLogo={deleteLogo}
              pickDefaultLogo={pickDefaultLogo}
            />
          )}
        </WrapperLogoImg>
        <Typography
          style={{ padding: 8, wordWrap: 'break-word' }}
          align="center"
          variant="headline"
          component="figcaption"
        >
          {logo.name}
        </Typography>
        {logo.isMain && !isHoverOpen && <Mark textContent="default" />}
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
