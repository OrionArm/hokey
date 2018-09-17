import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import Header from './Header';
import ItemLogo from './ItemLogo';

type State = Readonly<typeof initialState>;

const initialState = {
  checked: false,
};

class LogoListPage extends Component {
  readonly state: State = initialState;

  render() {
    return (
      <>
        <Grid item container justify="space-between" md={12}>
          <Header />
        </Grid>
        <Grid
          item
          container
          spacing={24}
          style={{ justifyContent: 'space-between' }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
            return (
              <Grid item key={index}>
                <ItemLogo item={item} />
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
}

export default LogoListPage;
