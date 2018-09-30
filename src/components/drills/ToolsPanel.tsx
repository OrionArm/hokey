import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFilm } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  createStyles,
  MenuItem,
  Select,
  Theme,
  withStyles,
  WithStyles,
  Tooltip,
} from '@material-ui/core';
import {
  regenerateDrillsRequest,
  downloadDrillsRequest,
} from 'src/store/drils/actions';
import { DownloadDrill } from 'src/store/drils/model';
import ControlBtn from './ControlBtn';

interface ToolsPanelProps extends WithStyles<typeof styles> {
  checkedIds: string[];
  selectedUserId: string;
  regenerateDrillsRequest: typeof regenerateDrillsRequest;
  downloadDrillsRequest: typeof downloadDrillsRequest;
  loadingData: DownloadDrill;
}

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
    this.props.downloadDrillsRequest({
      checkedIds: this.props.checkedIds,
      selectedUserId: this.props.selectedUserId,
      loading: { allVideo: true },
    });
  }

  downloadSelectedPdfs = () => {
    this.props.downloadDrillsRequest({
      checkedIds: this.props.checkedIds,
      selectedUserId: this.props.selectedUserId,
      loading: { allPdf: true },
    });
  }

  handleDisableIconBtn = variants => Object.values(variants).includes(true);

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
          <div
            style={{
              position: 'relative',
              borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 0,
            }}
          >
            <ControlBtn
              onDownload={this.downloadSelectedVideos}
              loadingData={this.props.loadingData}
              checkedIds={this.props.checkedIds}
              current="allVideo"
            >
              <FontAwesomeIcon icon={faFilm} />
            </ControlBtn>
          </div>
        </Tooltip>
        <Tooltip title="Download Selected PDFS" placement="top">
          <div
            style={{
              position: 'relative',
              borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 0,
            }}
          >
            <ControlBtn
              onDownload={this.downloadSelectedPdfs}
              loadingData={this.props.loadingData}
              checkedIds={this.props.checkedIds}
              current="allPdf"
            >
              <FontAwesomeIcon icon={faDownload} />
            </ControlBtn>
          </div>
        </Tooltip>
      </div>
    );
  }
}

const styles = (theme: Theme) => {
  return createStyles({
    wrapperPanel: {
      display: 'flex',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      borderBottomLeftRadius: theme.shape.borderRadius,
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
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
      borderBottomLeftRadius: theme.shape.borderRadius,
    },
    rootBtn: {
      textTransform: 'capitalize',
      padding: 0,
    },
    wrapperBtn: {
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
      background: theme.palette.action.disabledBackground,
      borderRadius: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: '100%',
    },
  });
};

export default withStyles(styles)(ToolsPanel);
