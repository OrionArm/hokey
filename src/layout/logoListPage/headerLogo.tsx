import React from 'react';
import { Typography, Button } from '@material-ui/core';

type Props = { addLogo(): void };
const HeaderLogo: React.SFC<Props> = ({ addLogo }) => {
  const onClick = () => addLogo();
  return (
    <>
      <Typography variant="headline">My Logos</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        new logos
      </Button>
    </>
  );
};

export default HeaderLogo;
