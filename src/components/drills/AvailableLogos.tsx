import {
  createStyles,
  Grid,
  withStyles,
  Typography,
  Paper,
  WithStyles,
} from '@material-ui/core';
import { compose } from 'redux';
import Slide from '@material-ui/core/Slide';
import React, { Component } from 'react';
import { DrillDetailed } from 'src/store/drils/model';
import { NormLogos } from 'src/store/logos/interface';

import LogoItem from '../logos/LogoItem';

type Props = {
  selectedDrill: DrillDetailed | null;
  logos: NormLogos;
  isHoverOpen: null | string;
  handleHover: (id: string) => void;
  regenerateWithNewLogo(logoId: string): void;
} & WithStyles<typeof styles>;

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
                    isHoverOpen={this.props.isHoverOpen === id}
                    onHoverHandle={() => this.props.handleHover(id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Slide>
    );
  }
}

const styles = createStyles({});

export default compose(withStyles(styles))(AvailableLogos);
