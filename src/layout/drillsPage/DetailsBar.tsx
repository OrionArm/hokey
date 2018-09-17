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
export interface DetailsProps {
  classes?: any;
  theme: any;
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
          <Tab
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Logo"
          />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>Item One</TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DetailsBar);
