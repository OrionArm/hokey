import { faDownload, faFilm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// tslint:disable-next-line:max-line-length
import {
  Button,
  createStyles,
  IconButton,
  MenuItem,
  Select,
  Theme,
  withStyles,
  WithStyles,
  Tooltip,
} from '@material-ui/core';
import React, { Component } from 'react';
import { regenerateDrillsRequest } from 'src/store/drils/actions';
import drillsAPI from 'src/store/drils/api';

type ToolsPanelProps = WithStyles<typeof styles> & {
  checkedIds: string[];
  selectedUserId: string;
  regenerateDrillsRequest: typeof regenerateDrillsRequest;
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
      this.props.regenerateDrillsRequest({
        drill_ids: this.props.checkedIds,
        userId: this.props.selectedUserId,
      });
    }
    // TODO: implement 'choose logo' modal
    // drillsAPI.regenerateWithNewLogo(
    //   this.props.checkedIds,
    //   this.props.selectedUserId,
    // )
  }

  downloadSelectedVideos = () => {
    drillsAPI.downloadMultipleVideos(
      this.props.checkedIds,
      this.props.selectedUserId,
    );
  }

  downloadSelectedPdfs = () => {
    if (this.props.checkedIds.length === 0) {
      return;
    }
    drillsAPI.downloadMultiplePDFs(
      this.props.selectedUserId,
      this.props.checkedIds,
    );
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
        <Tooltip title="Download Selected Video" placement="top">
          <div>
            <IconButton
              classes={{
                root: classes.rootIconBtn,
              }}
              onClick={this.downloadSelectedVideos}
              disabled={this.props.checkedIds.length === 0}
            >
              <FontAwesomeIcon icon={faFilm} />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title="Download Selected PDFS" placement="top">
          <div>
            <IconButton
              classes={{
                root: classes.rootIconBtn,
              }}
              onClick={this.downloadSelectedPdfs}
              disabled={this.props.checkedIds.length === 0}
            >
              <FontAwesomeIcon icon={faDownload} />
            </IconButton>
          </div>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(styles)(ToolsPanel);
