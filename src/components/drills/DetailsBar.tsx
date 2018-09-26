import {
  createStyles,
  Paper,
  Tab,
  Tabs,
  withStyles,
  Theme,
  WithStyles,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { bindActionCreators, compose, Dispatch } from 'redux';
// tslint:disable-next-line:max-line-length
import {
  getSelectedDrillAnimationSelector,
  getSelectedDrillLogoSelector,
  getSelectedDrillPreviewSelector,
} from 'src/store/drils/selectors';
import { RootState } from 'src/store/rootReducers';
import { isLogosAvailableSelector } from 'src/store/user/store/selectors';
import { WrapperLogoImg } from 'src/UI/';
export interface DetailsProps extends WithStyles<typeof styles> {
  theme: Theme;
  preview: string;
  animation: string;
  logo: string;
  showLogo: boolean;
  selectedTab: number;
  onTabChange: (index: number) => void;
}

const TabContainer = props => {
  return (
    <WrapperLogoImg style={{ padding: 24 }}>{props.children}</WrapperLogoImg>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    tabsRoot: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    tabsIndicator: {},
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
        color: theme.palette.primary.main,
      },

      '&$tabSelected': {
        // color: '#fff',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.primary.contrastText,
        },
      },
      '&:focus': {
        // backgrounColor: theme.palette.primary.light,
        // color: '#fff',
      },
    },
    tabSelected: {
      transition: 'background-color 0.7s',
    },
    tabContent: {
      maxWidth: '100%',
      height: '100%',
    },
  });

class DetailsBar extends Component<DetailsProps, any> {
  public render() {
    const { classes } = this.props;
    return (
      <Paper style={{ marginBottom: 24 }}>
        <Tabs
          fullWidth
          value={this.props.selectedTab}
          onChange={(event, value) => this.props.onTabChange(value)}
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
          {this.props.showLogo && (
            <Tab
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Logo"
            />
          )}
        </Tabs>
        <SwipeableViews
          index={this.props.selectedTab}
          onChangeIndex={this.props.onTabChange}
        >
          <TabContainer>
            {this.props.preview ? (
              <img className={classes.tabContent} src={this.props.preview} />
            ) : (
              <Typography variant="subheading">
                No preview this drill
              </Typography>
            )}
          </TabContainer>
          <TabContainer>
            {this.props.animation ? (
              <video className={classes.tabContent} controls>
                <source src={this.props.animation} type="video/mp4" />
              </video>
            ) : (
              <Typography variant="subheading">
                No animation this drill
              </Typography>
            )}
          </TabContainer>
          <TabContainer>
            {this.props.logo && (
              <img className={classes.tabContent} src={this.props.logo} />
            )}
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

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DetailsBar) as any;
