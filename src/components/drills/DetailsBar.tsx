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
import { WrapperLogoImg } from 'src/UI/';

const TabContainer = props => {
  return (
    <WrapperLogoImg style={{ padding: 16 }}>{props.children}</WrapperLogoImg>
  );
};

const mapStateToProps = (state: RootState) => ({
  preview: getSelectedDrillPreviewSelector(state),
  animation: getSelectedDrillAnimationSelector(state),
  logo: getSelectedDrillLogoSelector(state),
  showLogo: isLogosAvailableSelector(state),
});

export interface DetailsProps extends WithStyles<typeof styles> {
  theme: Theme;
  preview: string;
  animation: string;
  logo: string;
  showLogo: boolean;
  selectedTab: number;
  onTabChange: (index: number) => void;
}

class DetailsBar extends Component<DetailsProps, any> {
  public render() {
    const { classes, logo, animation } = this.props;
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
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.primary.contrastText,
        },
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
