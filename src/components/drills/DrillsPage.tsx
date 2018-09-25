import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/store/rootReducers';
import { hasUserProAccessSelector, isUserAnAdminSelector } from 'src/store/user/store/selectors';
import AvailableLogos from './AvailableLogos';
import CategoriesBar from './CategoriesBar';
import DetailsBar from './DetailsBar';
import DrillsBar from './DrillsBar';

interface Props {
  showLogos: boolean;
}
interface State {
  selectedTab: number;
}

class DrillsPage extends React.Component<Props, State> {
  state = {
    selectedTab: 0,
  };
  onTabChange = (selectedTab: number) => this.setState({ selectedTab });

  render() {
    return (
      <>
        <Grid item sm={12} style={{ marginBottom: 16 }}>
          <Typography variant="headline">My Drills</Typography>
        </Grid>
        <Grid container wrap="nowrap" spacing={8} justify="space-between">
          <Grid item md={4}>
            <CategoriesBar />
          </Grid>
          <Grid item md={5}>
            <DrillsBar />
          </Grid>
          <Grid item md={3}>
            <DetailsBar
              selectedTab={this.state.selectedTab}
              onTabChange={this.onTabChange}
            />
            {this.state.selectedTab === 2 && <AvailableLogos />}
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  showLogsoBar: hasUserProAccessSelector(state) || isUserAnAdminSelector(state),
});
export default connect(mapStateToProps)(DrillsPage);
