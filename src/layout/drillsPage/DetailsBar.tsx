import React, { Component } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  withStyles,
  createStyles,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'src/store/rootReducers';
import { getSelectedDrillPreviewSelector, getSelectedDrillLogoSelector,
  getSelectedDrillAnimationSelector } from 'src/drills/selectors';
import { isLogosAvailableSelector } from 'src/user/selectors';
// import { DrillDetailed } from 'src/drills/model';

export interface DetailsProps {
  classes?: any;
  theme: any;
  preview: string;
  animation: string;
  logo: string;
  showLogo: boolean;
}

const TabContainer = (props: any) => {
  return <Typography component="div">{props.children}</Typography>;
};

const styles = (theme: any) =>
  createStyles({
    tabsRoot: {
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: 4,
      marginBottom: theme.spacing.unit * 3,
    },
    tabsIndicator: {
      backgroundColor: 'transparent',
    },
    flexContainer: {
      justifyContent: 'space-between',
    },
    tabRoot: {
      textTransform: 'capitalize',
      minWidth: 'auto',
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      '&:last-child': {
        borderRight: 'none',
      },
      '&:hover': {
        color: theme.palette.primary.light,
      },

      '&$tabSelected': {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
      },
      '&:focus': {
        backgrounColor: theme.palette.primary.light,
        color: '#fff',
      },
    },
    tabSelected: {},
  });

class DetailsBar extends Component<DetailsProps, any> {
  state = {
    value: 0,
  };

  handleChange = (event: any, value: any) => {
    this.setState({ value });
  }

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  }

  public render() {
    const { value } = this.state;
    const { classes, theme } = this.props;
    return (
      <Paper>
        <Tabs
          fullWidth
          value={value}
          onChange={this.handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator,
            flexContainer: classes.flexContainer,
          }}
        >
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Preview"
          />
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Animation"
          />
          {this.props.showLogo && <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Logo"
          />}
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <img style={{ width: '100%' }} src={this.props.preview || undefined} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {this.props.animation &&
              <video style={{ width: '100%' }} controls>
                <source src={this.props.animation} type="video/mp4" />
              </video>
            }
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {this.props.logo && <img style={{ width: '100%' }} src={this.props.logo} />}
          </TabContainer>
        </SwipeableViews>
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  preview: getSelectedDrillPreviewSelector(state),
  animation: getSelectedDrillAnimationSelector(state),
  logo: getSelectedDrillLogoSelector(state),
  showLogo: isLogosAvailableSelector(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({}, dispatch),
});

export default
  compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps),
  )(DetailsBar);
