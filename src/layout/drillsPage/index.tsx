import React from 'react';
import CategoriesBar from './CategoriesBar';
import DetailsBar from './DetailsBar';
// import DrillsBar from './DrillsBar';
import { Grid, Typography } from '@material-ui/core';

const AsideGrid = ({ children }: any) => (
  <Grid item sm={3} style={{ minWidth: 300 }}>
    {children}
  </Grid>
);

const DrillsPage = () => (
  <>
    <Grid item sm={12}>
      <Typography variant="headline">My Drills</Typography>
    </Grid>
    <Grid container wrap="nowrap" spacing={16} justify="space-between">
      <AsideGrid>
        <CategoriesBar />
      </AsideGrid>
      <Grid item style={{ flexGrow: 1 }}>
        {/*<DrillsBar />*/}
      </Grid>
      <AsideGrid>
        <DetailsBar />
      </AsideGrid>
    </Grid>
  </>
);

export default DrillsPage;
