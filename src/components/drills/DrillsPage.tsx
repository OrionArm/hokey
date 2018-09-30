import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { getSelectedDrillSelector } from 'src/store/drils/selectors';
import { RootState } from 'src/store/rootReducers';
import {
  hasUserProAccessSelector,
  isUserAnAdminSelector,
} from 'src/store/user/store/selectors';
import AvailableLogos from './AvailableLogos';
import CategoriesBar from './CategoriesBar';
import DetailsBar from './DetailsBar';
import DrillsBar from './DrillsBar';

interface State {
  selectedTab: number;
}

type Props = injectStateProps;

class DrillsPage extends React.Component<Props, State> {
  state = {
    selectedTab: 0,
  };
  onTabChange = (selectedTab: number) => this.setState({ selectedTab });

  render() {
    const { selectDrill } = this.props;
    return (
      <>
        <Typography
          style={{ marginBottom: 16, flexGrow: 1 }}
          variant="headline"
        >
          My Drills
        </Typography>
        <Grid container wrap="nowrap" spacing={8} justify="space-between">
          <Grid item md={3}>
            <CategoriesBar />
          </Grid>
          <Grid item md={selectDrill ? 6 : 9}>
            <DrillsBar />
          </Grid>
          {selectDrill ? (
            <Grid item md={3}>
              <DetailsBar
                selectedTab={this.state.selectedTab}
                onTabChange={this.onTabChange}
              />
              {this.state.selectedTab === 2 && <AvailableLogos />}
            </Grid>
          ) : null}
        </Grid>
      </>
    );
  }
}

type injectStateProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: RootState) => ({
  showLogoBar: hasUserProAccessSelector(state) || isUserAnAdminSelector(state),
  selectDrill: getSelectedDrillSelector(state),
});
export default connect(mapStateToProps)(DrillsPage);
