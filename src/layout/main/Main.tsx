import React, { Component } from 'react';
import Categories from './CategoriesBar';
import Drills from './DrillsBar';
import Details from './DetailsBar';
import { Grid, Paper } from '@material-ui/core';

export interface MainProps {}

export default class Main extends Component<MainProps, any> {
  public render() {
    return (
      <Grid
        container
        justify="space-between"
        alignItems="center"
        component="main"
        spacing={24}
        style={{ marginTop: 30, padding: '0 24px' }}
      >
        <Grid item xs={3}>
          <Paper style={{ padding: 20 }}>
            <Categories />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper>
            <Drills />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Details />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
