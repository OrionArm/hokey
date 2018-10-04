import {
  createStyles,
  Grid,
  withStyles,
  Typography,
  Paper,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import React, { Component } from 'react';
import { DrillDetailed } from 'src/store/drils/model';
import { NormLogos } from 'src/store/logos/interface';

import LogoItem from '../logos/LogoItem';

type Props = {
  classes: any;
  selectedDrill: DrillDetailed | null;
  logos: NormLogos;
  regenerateWithNewLogo(logoId: string): void;
};

class AvailableLogos extends Component<Props> {
  state = {
    isHoverOpen: null,
  };
  render() {
    const { logos, regenerateWithNewLogo } = this.props;
    const logosIds: string[] = Object.keys(logos);

    return (
      <Slide direction="up" in>
        <Paper component="section" style={{ padding: 24 }}>
          <Grid container spacing={24} direction="column">
            <Grid item>
              <Typography
                style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  paddingBottom: 8,
                }}
                variant="title"
                color="primary"
                component="h4"
              >
                Available Logos
              </Typography>
            </Grid>
            {logosIds.map(id => {
              return (
                <Grid item key={id}>
                  <LogoItem
                    logo={logos[id]}
                    regenerateWithNewLogo={regenerateWithNewLogo}
                    isHoverOpen={this.state.isHoverOpen === id}
                    onHoverHandle={() => this.handleHover(id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Slide>
    );
  }

  handleHover = hoveringLogo =>
    this.setState({
      isHoverOpen: hoveringLogo,
    })
}

const styles = createStyles({});

export default withStyles(styles)(AvailableLogos);
