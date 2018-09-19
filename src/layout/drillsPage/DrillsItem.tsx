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

import { Drill } from 'src/drills/model';

interface DrillsProps {
  drill: Drill;
  checked: boolean;
  onSelect: () => void;
}
interface State {

}

const styles = createStyles({

});

class DrillsItem extends Component<DrillsProps, State> {

  public render() {
    return (
      <>
        <ListItem
          component="li"
          role={undefined}
          button
        >
          <Checkbox
            checked={Boolean(this.props.checked)}
            tabIndex={-1}
            disableRipple
            color="primary"
            onChange={this.props.onSelect}
          />
          <ListItemText primary={this.props.drill.name} />

          <IconButton aria-label="Regenerate" title="Regenerate">
            <FontAwesomeIcon icon={faSyncAlt} />
          </IconButton>
          <IconButton aria-label="Download Video" title="Download Video">
            <FontAwesomeIcon icon={faFilm} />
          </IconButton>
          <IconButton aria-label="Download PDF" title="Download PDF">
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
