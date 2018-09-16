import React from 'react';
import CategoriesBar from './CategoriesBar';
import DetailsBar from './DetailsBar';
import DrillsBar from './DrillsBar';
import { Grid, Typography } from '@material-ui/core';
import MainMenu from 'src/components/mainMenu/MainMenu';

const DrillsPage = () => (
  <>
    <MainMenu/>
    <Grid
      container
      justify="space-between"
      component="main"
      spacing={24}
      style={{ marginTop: 30, padding: '0 24px' }}
    >
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
    </Grid>
  </>
);

export default DrillsPage;
