import React from 'react';
import CategoriesBar from './CategoriesBar';
import DetailsBar from './DetailsBar';
import DrillsBar from './DrillsBar';
import { Grid, Typography } from '@material-ui/core';
import AvailableLogos from './AvailableLogos';
import { connect } from 'react-redux';
import { RootState } from 'src/store/rootReducers';
import { hasUserProAccessSelector, isUserAnAdminSelector } from 'src/user/selectors';

const DrillsPage = ({ showLogsoBar }: any) => (
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
        {showLogsoBar && <AvailableLogos />}
      </Grid>
    </Grid>
  </>
);

const mapStateToProps = (state: RootState) => ({
  showLogsoBar: hasUserProAccessSelector(state) || isUserAnAdminSelector(state),
});
export default connect(mapStateToProps)(DrillsPage);
