import React from 'react';
import { Typography, Button, Grid } from '@material-ui/core';

type Props = { addLogo(): void };
const HeaderLogo: React.SFC<Props> = ({ addLogo }) => {
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
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        new logos
      </Button>
      </Grid>
  );
};

export default HeaderLogo;
