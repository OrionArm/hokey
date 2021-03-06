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
import { compose } from 'redux';
import {
  getSelectedDrillAnimationSelector,
  getSelectedDrillLogoSelector,
  getSelectedDrillPreviewSelector,
} from 'src/store/drils/selectors';
import { RootState } from 'src/store/rootReducers';
import { isLogosAvailableSelector } from 'src/store/user/store/selectors';

const TabContainer = ({ children }: any) => {
  return <div style={{ padding: 16, height: 250 }}>{children}</div>;
};

const mapStateToProps = (state: RootState) => ({
  preview: getSelectedDrillPreviewSelector(state),
  animation: getSelectedDrillAnimationSelector(state),
  logo: getSelectedDrillLogoSelector(state),
  showLogo: isLogosAvailableSelector(state),
  access: isLogosAvailableSelector(state),
});

export interface Props extends WithStyles<typeof styles> {
  theme: Theme;
  preview: string;
  animation: string;
  logo: string;
  showLogo: boolean;
  selectedTab: number;
  onTabChange: (index: number) => void;
  access?: boolean;
}

class DetailsBar extends Component<Props, any> {
  public render() {
    const { classes, logo, animation, access } = this.props;
    const logoKey = logo && logo.slice(logo.indexOf('.com') + 3);
    const animationKey =
      animation && animation.slice(animation.indexOf('.com') + 3);

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
          {this.props.showLogo &&
            access && (
              <Tab
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected,
                }}
                label="Logo"
              />
            )}
        </Tabs>
        <SwipeableViews
          index={this.props.selectedTab}
          onChangeIndex={this.props.onTabChange}
          key={animationKey}
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
          <TabContainer key={logoKey}>
            {logo && <img className={classes.tabContent} src={logo} />}
          </TabContainer>
        </SwipeableViews>
      </Paper>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    tabsRoot: {
      borderBottom: theme.custom.border,
    },
    tabsIndicator: {
      display: 'none',
    },
    flexContainer: {
      justifyContent: 'space-between',
    },
    tabRoot: {
      textTransform: 'capitalize',
      minWidth: 'auto',
      color: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.primary.light,
      },
      '&$tabSelected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
    tabSelected: {
      transition: 'background-color 0.7s',
    },
    tabContent: {
      maxWidth: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  });

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null,
  ),
)(DetailsBar) as any;
