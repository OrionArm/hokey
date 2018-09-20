import React from 'react';
import CategoriesBar from './CategoriesBar';
import DetailsBar from './DetailsBar';
import DrillsBar from './DrillsBar';
import { Grid, Typography } from '@material-ui/core';
import AvailableLogos from './AvailableLogos';

const DrillsPage = () => (
  <>
    <Grid item sm={12} style={{ marginBottom: 16 }}>
      <Typography variant="headline">My Drills</Typography>
    </Grid>
    <Grid container wrap="nowrap" spacing={16} justify="space-between">
      <Grid item sm={3}>
        <CategoriesBar />
      </Grid>
      <Grid item sm={6}>
        <DrillsBar />
      </Grid>
      <Grid item sm={3}>
        <DetailsBar />
        <AvailableLogos />
      </Grid>
    </Grid>
  </>
);

export default DrillsPage;
