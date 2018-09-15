import React, { Component } from 'react';
// import DrillsList from '../layout/drillsList';
import LogoList from '../layout/logoList';
import { Grid } from '@material-ui/core';

export interface MainProps {}

export default class Main extends Component<MainProps, any> {
  public render() {
    return (
      <Grid
        container
        justify="space-between"
        component="main"
        spacing={24}
        style={{ marginTop: 30, padding: '0 24px' }}
      >
        {/* <DrillsList /> */}
        <LogoList />
      </Grid>
    );
  }
}
