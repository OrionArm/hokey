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
  regenerateWithNewLogo,
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
              regenerateWithNewLogo={regenerateWithNewLogo}
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
    card: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 0,
    },
    media: {
      backgroundColor: theme.palette.common.white,
      width: '100%',
      objectFit: 'contain',
    },
  });

export default withStyles(styles, { withTheme: true })(LogoItem);
