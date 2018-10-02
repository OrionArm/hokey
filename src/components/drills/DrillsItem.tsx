import React, { Component } from 'react';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  faDownload,
  faFilm,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Checkbox,
  createStyles,
  Divider,
  LinearProgress,
  ListItem,
  ListItemText,
  withStyles,
  WithStyles,
  Tooltip,
  Theme,
} from '@material-ui/core';
import {
  regenerateDrillsRequest,
  downloadDrillsRequest,
} from 'src/store/drils/actions';
import {
  DrillModel,
  DownloadDrill,
  CurrentLoadingType,
} from 'src/store/drils/model';
import {
  getGenerationStatusSelector,
  getLoadingData,
} from 'src/store/drils/selectors';
import { RootState } from 'src/store/rootReducers';
import { getUserId } from 'src/store/selectors';
import ControllBtn from './ControlBtn';

const mapStateToProps = (state: RootState, props) => {
  return {
    selectedUserId: getUserId(state),
    loadingData: getLoadingData(state),
    isRegenerating: Boolean(
      props.drill && getGenerationStatusSelector(state)[props.drill.id],
    ),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    { regenerateDrillsRequest, downloadDrillsRequest },
    dispatch,
  ),
});

interface Props extends WithStyles<typeof styles> {
  drill: DrillModel;
  checked: boolean;
  loadingData: DownloadDrill;
  onCheck: () => void;
  selectDrill: (id: string, userId: string) => void;
  isSelected: boolean;
  selectedUserId: number | 'me';
  actions: {
    regenerateDrillsRequest: typeof regenerateDrillsRequest;
    downloadDrillsRequest: typeof downloadDrillsRequest;
  };
  isRegenerating: boolean;
}

class DrillsItem extends Component<Props, object> {
  downloadVideo = (event: React.MouseEvent) => {
    event.stopPropagation();
    this.props.actions.downloadDrillsRequest({
      checkedIds: [this.props.drill.id],
      selectedUserId: this.props.selectedUserId,
      loading: { selfVideo: this.props.drill.id },
    });
  }
  downloadPdf = (event: React.MouseEvent) => {
    event.stopPropagation();
    this.props.actions.downloadDrillsRequest({
      checkedIds: [this.props.drill.id],
      selectedUserId: this.props.selectedUserId,
      loading: { selfPdf: this.props.drill.id },
    });
  }
  regenerate = (event: React.MouseEvent) => {
    event.stopPropagation();
    this.props.actions.regenerateDrillsRequest({
      userId: this.props.selectedUserId,
      drill_ids: [this.props.drill.id],
    });
  }
  selectDrill = (event: React.MouseEvent) => {
    this.props.selectDrill(this.props.drill.id, this.props.drill.userId);
  }

  public render() {
    console.log('this.props.drill.name', this.props.drill.name);
    return (
      <>
        <ListItem
          component="li"
          role={undefined}
          button
          onClick={this.selectDrill}
          selected={this.props.isSelected}
          style={{ display: 'flex' }}
        >
          <Checkbox
            checked={Boolean(this.props.checked)}
            tabIndex={-1}
            disableRipple
            color="primary"
            onClick={event => event.stopPropagation()}
            onChange={this.props.onCheck}
          />
          <ListItemText primary={this.props.drill.name} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Tooltip title="Regenerate" placement="top">
              <div style={{ marginRight: 8 }}>
                <ControllBtn
                  loadingData={this.props.loadingData}
                  onDownload={this.regenerate}
                  current={CurrentLoadingType.regenerate}
                  hasAnimation={!this.props.drill.hasAnimation}
                >
                  <FontAwesomeIcon icon={faSyncAlt} />
                </ControllBtn>
              </div>
            </Tooltip>
            {this.props.isRegenerating ? (
              <LinearProgress
                style={{ width: 116 }}
                variant="query"
                color="secondary"
              />
            ) : (
              <>
                <Tooltip title="Download Video" placement="top">
                  <div style={{ marginRight: 8, position: 'relative' }}>
                    <ControllBtn
                      loadingData={this.props.loadingData}
                      onDownload={this.downloadVideo}
                      current={CurrentLoadingType.selfVideo}
                      drillsId={this.props.drill.id}
                      hasAnimation={!this.props.drill.hasAnimation}
                    >
                      <FontAwesomeIcon icon={faFilm} />
                    </ControllBtn>
                  </div>
                </Tooltip>
                <Tooltip title="Download PDF" placement="top">
                  <div style={{ marginRight: 8, position: 'relative' }}>
                    <ControllBtn
                      loadingData={this.props.loadingData}
                      onDownload={this.downloadPdf}
                      current={CurrentLoadingType.selfPdf}
                      drillsId={this.props.drill.id}
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </ControllBtn>
                  </div>
                </Tooltip>
              </>
            )}
          </div>
        </ListItem>
        <Divider />
      </>
    );
  }
}

const styles = (theme: Theme) => {
  return createStyles({
    iconBtn: {
      '&:disabled': {
        backgroundColor: '#eeeeee',
      },
      '&:not(:disabled)': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
  });
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DrillsItem) as any;
