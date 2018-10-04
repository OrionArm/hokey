import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faFilm,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
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
import { DownloadDrill, CurrentLoadingType } from 'src/store/drils/model';
import ControlBtn from './ControlBtn';

interface ToolsPanelProps extends WithStyles<typeof styles> {
  theme: Theme;
  checkedIds: string[];
  selectedUserId: string;
  regenerateDrillsRequest: typeof regenerateDrillsRequest;
  downloadDrillsRequest: typeof downloadDrillsRequest;
  loadingData: DownloadDrill;
}

export enum GenerateType {
  Generate = 'Generate',
  GenerateWithNewLogo = 'Generate with new logo',
}

class ToolsPanel extends Component<ToolsPanelProps, any> {
  state = {
    selected: GenerateType.Generate,
  };

  handleChange = (event: any) => {
    this.setState({
      selected: event.target.value,
    });
    if (event.target.value === GenerateType.Generate) {
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
    const { classes, theme } = this.props;

    return (
      <div className={classes.wrapperPanel}>
        <Select
          value={this.state.selected}
          onChange={this.handleChange}
          name="selected"
          autoWidth
          classes={{
            root: classes.rootSelect,
            select: classes.select,
          }}
          renderValue={value => {
            return (
              <>
                <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: 8 }} />
                {value}
              </>
            );
          }}
        >
          <MenuItem value={GenerateType.Generate}>
            {GenerateType.Generate}
          </MenuItem>
          <MenuItem value={GenerateType.GenerateWithNewLogo}>
            {GenerateType.GenerateWithNewLogo}
          </MenuItem>
        </Select>

        <Tooltip title="Download Selected Video" placement="top">
          <div
            style={{
              position: 'relative',
              borderLeft: theme.custom.border,
              borderRadius: 0,
            }}
          >
            <ControlBtn
              onDownload={this.downloadSelectedVideos}
              loadingData={this.props.loadingData}
              checkedIds={this.props.checkedIds}
              current={CurrentLoadingType.allVideo}
            >
              <FontAwesomeIcon icon={faFilm} />
            </ControlBtn>
          </div>
        </Tooltip>
        <Tooltip title="Download Selected PDFS" placement="top">
          <div
            style={{
              position: 'relative',
              borderLeft: theme.custom.border,
              borderRadius: 0,
            }}
          >
            <ControlBtn
              onDownload={this.downloadSelectedPdfs}
              loadingData={this.props.loadingData}
              checkedIds={this.props.checkedIds}
              current={CurrentLoadingType.allPdf}
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
      borderBottom: theme.custom.border,
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
      borderLeft: theme.custom.border,
      borderBottomLeftRadius: theme.shape.borderRadius,
    },

    wrapperBtn: {
      borderLeft: theme.custom.border,
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

export default withStyles(styles, { withTheme: true })(ToolsPanel);
