import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';

type Props = { addLogo(): void, access: boolean };
const LogoHeader: React.SFC<Props> = ({ addLogo, access }) => {
  const onClick = () => addLogo();
  return (
    <Grid
      item
      container
      justify="space-between"
      md={12}
      style={{ marginBottom: 16 }}
    >
      <Typography variant="headline">My Logos</Typography>
      {
        access
        &&
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          new logos
        </Button>
      }

    </Grid>
  );
};

export default LogoHeader;
