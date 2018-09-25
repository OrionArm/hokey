import { faDownload, faFilm, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// tslint:disable-next-line:max-line-length
import { Checkbox, createStyles, Divider, IconButton, LinearProgress, ListItem, ListItemText, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { regenerateDrillsRequest } from 'src/store/drils/actions';
import drillsApi from 'src/store/drils/api';
import { Drill } from 'src/store/drils/model';
import { getGenerationStatusSelector } from 'src/store/drils/selectors';
import { RootState } from 'src/store/rootReducers';
import { getUserId } from 'src/store/selectors';

interface DrillsProps {
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
interface State {

}

const styles = createStyles({

});

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
    this.props.actions.regenerateDrillsRequest([this.props.drill.id], this.props.selectedUserId);
  }
  selectDrill = (event: React.MouseEvent) => {
    this.props.selectDrill(this.props.drill.id, this.props.drill.userId);
  }

  public render() {
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
          <IconButton
            aria-label="Regenerate"
            title="Regenerate"
            disabled={!this.props.drill.has_animation}
            onClick={this.regenerate}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </IconButton>
          {this.props.isRegenerating
            ? <LinearProgress style={{ width: '95px', minWidth: '95px' }} variant="query" />
            : <>
              <IconButton
                aria-label="Download Video"
                title="Download Video"
                disabled={!this.props.drill.has_animation}
                onClick={this.downloadVideo}
              >
                <FontAwesomeIcon icon={faFilm} />
              </IconButton>
              <IconButton aria-label="Download PDF" title="Download PDF" onClick={this.downloadPdf}>
                <FontAwesomeIcon icon={faDownload} />
              </IconButton>
            </>
          }

        </ListItem>
        <Divider />
      </>
    );
  }
}

const mapStateToProps = (state: RootState, props) => ({
  selectedUserId: getUserId(state),
  isRegenerating: Boolean(props.drill && getGenerationStatusSelector(state)[props.drill.id]),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    regenerateDrillsRequest,
  },                          dispatch),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(DrillsItem) as any;
