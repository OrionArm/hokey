import React, { Component } from 'react';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  Divider,
  withStyles,
  createStyles,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSyncAlt,
  faDownload,
  faFilm,
} from '@fortawesome/free-solid-svg-icons';
import { compose, Dispatch } from 'redux';
import drillsApi from 'src/drills/api';
import { Drill } from 'src/drills/model';
import { RootState } from 'src/store/rootReducers';
import { getUserId } from 'src/store/selectors';
import { connect } from 'react-redux';

interface DrillsProps {
  drill: Drill;
  checked: boolean;
  onCheck: () => void;
  selectDrill: (id: string) => void;
  isSelected: boolean;
  selectedUserId: number | 'me';
}
interface State {

}

const styles = createStyles({

});

class DrillsItem extends Component<DrillsProps, State> {
  downloadPdf = (event: React.MouseEvent) => {
    event.stopPropagation();
    drillsApi.downloadPdf(this.props.drill.id);
  }
  downloadVideo = (event: React.MouseEvent) => {
    event.stopPropagation();
    drillsApi.downloadVideo(this.props.drill.id, this.props.selectedUserId);
  }
  regenerate = (event: React.MouseEvent) => {
    event.stopPropagation();
    drillsApi.regenerate(this.props.drill.id, this.props.selectedUserId).then(x => console.log(x));
  }
  selectDrill = (event: React.MouseEvent) => {
    this.props.selectDrill(this.props.drill.id);
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
        </ListItem>
        <Divider />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  selectedUserId: getUserId(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(DrillsItem) as any;
