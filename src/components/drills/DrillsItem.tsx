import {
  faDownload,
  faFilm,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// tslint:disable-next-line:max-line-length
import {
  Checkbox,
  createStyles,
  Divider,
  IconButton,
  LinearProgress,
  ListItem,
  ListItemText,
  withStyles,
  WithStyles,
  Tooltip,
  Theme,
} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { regenerateDrillsRequest } from 'src/store/drils/actions';
import drillsApi from 'src/store/drils/api';
import { Drill } from 'src/store/drils/model';
import { getGenerationStatusSelector } from 'src/store/drils/selectors';
import { RootState } from 'src/store/rootReducers';
import { getUserId } from 'src/store/selectors';

interface DrillsProps extends WithStyles<typeof styles> {
  drill: Drill;
  checked: boolean;
  onCheck: () => void;
  selectDrill: (id: string, userId: string) => void;
  isSelected: boolean;
  selectedUserId: number | 'me';
  actions: {
    regenerateDrillsRequest: typeof regenerateDrillsRequest;
  };
  isRegenerating: boolean;
}
interface State {}

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

class DrillsItem extends Component<DrillsProps, State> {
  downloadPdf = (event: React.MouseEvent) => {
    event.stopPropagation();
    drillsApi.downloadPdf(this.props.drill.id, this.props.selectedUserId);
  }
  downloadVideo = (event: React.MouseEvent) => {
    event.stopPropagation();
    drillsApi.downloadVideo(this.props.drill.id, this.props.selectedUserId);
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
    const { classes } = this.props;
    return (
      <>
        <ListItem
          component="li"
          role={undefined}
          button
          onClick={this.selectDrill}
          selected={this.props.isSelected}
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
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Tooltip title="Regenerate" placement="top">
              <div style={{ marginRight: 8 }}>
                <IconButton
                  className={classes.iconBtn}
                  aria-label="Regenerate"
                  disabled={!this.props.drill.has_animation}
                  onClick={this.regenerate}
                >
                  <FontAwesomeIcon icon={faSyncAlt} />
                </IconButton>
              </div>
            </Tooltip>

            {this.props.isRegenerating ? (
              <LinearProgress
                style={{ width: 104 }}
                variant="query"
                color="secondary"
              />
            ) : (
              <>
                <Tooltip title="Download Video" placement="top">
                  <div style={{ marginRight: 8 }}>
                    <IconButton
                      aria-label="Download Video"
                      className={classes.iconBtn}
                      disabled={!this.props.drill.has_animation}
                      onClick={this.downloadVideo}
                    >
                      <FontAwesomeIcon icon={faFilm} />
                    </IconButton>
                  </div>
                </Tooltip>
                <Tooltip title="Download PDF" placement="top">
                  <div>
                    <IconButton
                      aria-label="Download PDF"
                      onClick={this.downloadPdf}
                      className={classes.iconBtn}
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </IconButton>
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

const mapStateToProps = (state: RootState, props) => ({
  selectedUserId: getUserId(state),
  isRegenerating: Boolean(
    props.drill && getGenerationStatusSelector(state)[props.drill.id],
  ),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ regenerateDrillsRequest }, dispatch),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DrillsItem) as any;
