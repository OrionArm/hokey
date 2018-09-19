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
import { compose } from 'redux';
import drillsApi from 'src/drills/api';
import { Drill } from 'src/drills/model';

interface DrillsProps {
  drill: Drill;
  checked: boolean;
  onCheck: () => void;
  selectDrill: (id: string) => void;
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
    drillsApi.downloadVideo(this.props.drill.id);
  }
  regenerate = (event: React.MouseEvent) => {
    event.stopPropagation();
    drillsApi.regenerate(this.props.drill.id).then(x => console.log(x));
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
        >
          <Checkbox
            checked={Boolean(this.props.checked)}
            tabIndex={-1}
            disableRipple
            color="primary"
            onChange={this.props.onCheck}
          />
          <ListItemText primary={this.props.drill.name} />

          <IconButton
            aria-label="Regenerate"
            title="Regenerate"
            onClick={this.regenerate}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </IconButton>
          <IconButton
            aria-label="Download Video"
            title="Download Video"
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

// const mapStateToProps = (state: RootState) => ({
//   drills: getDrillsSelector(state),
// });
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   actions: bindActionCreators({}, dispatch),
// });

export default compose(
  withStyles(styles),
  // connect(mapStateToProps, mapDispatchToProps),
)(DrillsItem);
