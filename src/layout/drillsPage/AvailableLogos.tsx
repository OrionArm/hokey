import React, { Component } from 'react';
import {
  Paper,
  withStyles,
  createStyles,
  Grid,
} from '@material-ui/core';

import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RootState } from '../../store/rootReducers';
import { DrillDetailed } from 'src/drills/model';
import { logosActions } from 'src/logos/actions';
import ItemLogo from '../logoListPage/ItemLogo';

interface DrillsProps {
  classes: any;
  selectedDrill: DrillDetailed | null;
}
type Props = DrillsProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;
interface State {
  checkedLogo: { [id: string]: boolean };
}

const styles = createStyles({
  rootBtn: {
    textTransform: 'capitalize',
    padding: 0,
  },
  rootLabel: {
    margin: 0,
    paddingRight: 16,
  },
});

class AvailableLogos extends Component<Props, State> {
  state = {
    checkedLogo: {},
  };

  useLogo = (id: string) => {
    const checkedLogo = { [id]: !this.state.checkedLogo[id] };
    this.setState({ checkedLogo });
  }
  componentDidMount() {
    this.props.actions.getLogosRequest();
  }

  public render() {
    return (
      <Paper>
        <header
          style={{
            justifyContent: 'space-between',
            display: 'flex',
            height: 50,
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            Available Logos
          </div>
        </header>
        <Grid
          item
          container
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
            gridGap: 24,
            alignItems: 'stretch',
          }}
        >
          {this.props.logos.map((item, index) => {
            return (
              <Grid item key={index}>
                <ItemLogo
                  item={item}
                  useThisLogo={this.useLogo}
                  logoIsUsed={this.state.checkedLogo[item.id]}
                />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  logos: state.watermarks.logos,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(logosActions, dispatch),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(AvailableLogos);
