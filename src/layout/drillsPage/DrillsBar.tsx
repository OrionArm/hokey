import React, { Component } from 'react';
import {
  Paper,
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  withStyles,
  createStyles,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSyncAlt,
  faDownload,
  faFilm,
} from '@fortawesome/free-solid-svg-icons';

import ToolsPanel from '../../UI/ToolsPanel';
export interface DrillsProps {
  classes: any;
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

class DrillsBar extends Component<DrillsProps, any> {
  state = {
    checked: [0],
  };

  handleToggle = (value: number) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  }

  public render() {
    const { classes } = this.props;
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
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 4,
              display: 'flex',
            }}
          >
            <Button
              classes={{
                root: classes.rootBtn,
              }}
              style={{
                borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: 0,
              }}
            >
              <FormControlLabel
                classes={{
                  root: classes.rootLabel,
                }}
                control={<Checkbox color="primary" />}
                label="All"
              />
            </Button>
            <Button
              classes={{
                root: classes.rootBtn,
              }}
            >
              <FormControlLabel
                classes={{
                  root: classes.rootLabel,
                }}
                control={<Checkbox color="primary" />}
                label="Animated"
              />
            </Button>
          </div>
          <ToolsPanel />
        </header>
        <List>
          {[0, 1, 2, 3].map(value => (
            <>
              <ListItem
                component="li"
                key={value}
                role={undefined}
                button
                onClick={this.handleToggle(value)}
              >
                <Checkbox
                  checked={this.state.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  color="primary"
                />
                <ListItemText primary={`Line item ${value + 1}`} />

                <IconButton aria-label="Refresh">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </IconButton>
                <IconButton aria-label="Video">
                  <FontAwesomeIcon icon={faFilm} />
                </IconButton>
                <IconButton aria-label="Download">
                  <FontAwesomeIcon icon={faDownload} />
                </IconButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(DrillsBar);
