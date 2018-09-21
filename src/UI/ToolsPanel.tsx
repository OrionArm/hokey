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
  Theme,
  WithStyles,
} from '@material-ui/core';
import { downloadVideos } from 'src/utils/download-videos';
import drillsAPI from 'src/drills/api';
import { DrillDetailed } from 'src/drills/model';

type ToolsPanelProps = WithStyles<typeof styles> & {
  checkedIds: string[];
  selectedUserId: string;
};

const styles = (theme: Theme) =>
  createStyles({
    wrapperPanel: {
      display: 'flex',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: theme.shape.borderRadius,
    },
    rootSelect: {
      fontSize: '0.875rem',
    },
    select: {
      paddingLeft: theme.spacing.unit,
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

  handleChange = (event: any) => {
    if (event.target.value === '1') {
      drillsAPI.regenerate(
        this.props.checkedIds,
        this.props.selectedUserId,
      ).then(x => console.log(x));
    }
  }

  downloadSelectedVideos = () => {
    if (this.props.checkedIds.length === 0) {
      return;
    }
    Promise.all([
      ...this.props.checkedIds.map((id: string) =>
        drillsAPI.getDrill(id, this.props.selectedUserId)),
    ])
      .then(responses => responses.map(({ data }) => data))
      .then((drills: DrillDetailed[]) => drills.map(({ animation }) => animation))
      .then(downloadVideos);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapperPanel}>
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
            autoWidth
            classes={{
              root: classes.rootSelect,
              select: classes.select,
            }}
          >
            <MenuItem value="1">Generate</MenuItem>
            <MenuItem value="2">Generate with new logo</MenuItem>
          </Select>
        </Button>

        <IconButton
          classes={{
            root: classes.rootIconBtn,
          }}
          onClick={this.downloadSelectedVideos}
        >
          <FontAwesomeIcon
            icon={faFilm}
            title="Download Selected Video"
          />
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
