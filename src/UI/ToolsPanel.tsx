import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFilm } from '@fortawesome/free-solid-svg-icons';

import {
  Button,
  MenuItem,
  Select,
  withStyles,
  createStyles,
  IconButton,
} from '@material-ui/core';
interface ToolsPanelProps {
  classes?: any;
}

const styles = createStyles({
  select: {
    paddingLeft: 8,
    paddingTop: 0,
    paddingBottom: 0,
    height: 50,
    display: 'flex',
    alignItems: 'center',
  },
  rootBtn: {
    textTransform: 'capitalize',
    padding: 0,
  },
  rootIconBtn: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 0,
  },
});

class ToolsPanel extends Component<ToolsPanelProps, any> {
  state = {
    selected: '1',
  };

  handleChange = (event: any) =>
    this.setState({
      [event.target.name]: event.target.value,
    })

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 4,
        }}
      >
        <Button
          classes={{
            root: classes.rootBtn,
          }}
        >
          <Select
            value={this.state.selected}
            onChange={this.handleChange}
            name="selected"
            disableUnderline
            classes={{
              select: classes.select,
            }}
          >
            <MenuItem value="1">Generate</MenuItem>
            <MenuItem value="2">Generate with nw logo</MenuItem>
          </Select>
        </Button>

        <IconButton
          classes={{
            root: classes.rootIconBtn,
          }}
        >
          <FontAwesomeIcon icon={faFilm} />
        </IconButton>
        <IconButton
          classes={{
            root: classes.rootIconBtn,
          }}
        >
          <FontAwesomeIcon icon={faDownload} />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(ToolsPanel);
