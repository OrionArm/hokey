import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFilm } from '@fortawesome/free-solid-svg-icons';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Tooltip,
} from '@material-ui/core';
import BtnGenerate from 'src/components/drills/toolsPanel/BtnGenerate';
import BtnGeneratePremium from 'src/components/drills/toolsPanel/BtnGeneratePremium';
import {
  regenerateDrillsRequest,
  downloadDrillsRequest,
} from 'src/store/drils/actions';
import { DownloadDrill, CurrentLoadingType } from 'src/store/drils/model';
import ControlBtn from '../ControlBtn';

interface ToolsPanelProps extends WithStyles<typeof styles> {
  theme: Theme;
  checkedIds: string[];
  selectedUserId: string;
  regenerateDrillsRequest: typeof regenerateDrillsRequest;
  downloadDrillsRequest: typeof downloadDrillsRequest;
  loadingData: DownloadDrill;
  access: boolean;
}

export enum GenerateType {
  Generate            = 'Generate',
  GenerateWithNewLogo = 'Generate with new logo',
}

class ToolsPanel extends Component<ToolsPanelProps, any> {
  state = { selected: GenerateType.Generate };

  render() {
    const { classes, access, theme } = this.props;

    return (
      <div className={classes.wrapperPanel}>
        {
          access
          ? <BtnGeneratePremium selected={this.state.selected} handleChange={this.handleChange} />
          : <BtnGenerate selected={this.state.selected} handleChange={this.handleChange} />
        }
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
              <FontAwesomeIcon icon={faFilm}/>
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
              <FontAwesomeIcon icon={faDownload}/>
            </ControlBtn>
          </div>
        </Tooltip>
      </div>
    );
  }

  handleChange = (value: string) => {
    console.log('value', value);
    this.setState({
      selected: value,
    });
    if (value === GenerateType.Generate) {
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
}

const styles = (theme: Theme) => {
  return createStyles({
    wrapperPanel: {
      display: 'flex',
      borderBottom: theme.custom.border,
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
