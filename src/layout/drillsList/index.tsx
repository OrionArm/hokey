import React from 'react';
import CategoriesBar from './CategoriesBar';
import DetailsBar from './DetailsBar';
import DrillsBar from './DrillsBar';
import { Grid, Typography } from '@material-ui/core';

export default () => (
  <>
    <Grid item md={12}>
      <Typography variant="headline">My Drills</Typography>
    </Grid>
    <Grid item md={3}>
      <CategoriesBar />
    </Grid>
    <Grid item md>
      <DrillsBar />
    </Grid>
    <Grid item md={3}>
      <DetailsBar />
    </Grid>
  </>
);
