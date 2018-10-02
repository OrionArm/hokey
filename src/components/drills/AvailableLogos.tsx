import {
  createStyles,
  Grid,
  withStyles,
  Typography,
  Paper,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import React, { SFC } from 'react';
import { DrillDetailed } from 'src/store/drils/model';
import { LogoModel } from 'src/store/logos/model';

import ItemLogo from '../logos/LogoItem';

type Props = {
  classes: any;
  selectedDrill: DrillDetailed | null;
  logos: LogoModel[];
  regenerateWithNewLogo(logoId: string): void;
};

const AvailableLogos: SFC<Props> = ({ logos, regenerateWithNewLogo }) => {
  return (
    <Slide direction="up" in>
      <Paper component="section" style={{ padding: 24 }}>
        <Grid container spacing={24} direction="column">
          <Grid item>
            <Typography variant="title" color="primary" component="h4">
              Available Logos
            </Typography>
          </Grid>
          {
            logos.map(logo => {
              return (
                <Grid item key={logo.id}>
                  <ItemLogo
                    logo={logo}
                    regenerateWithNewLogo={regenerateWithNewLogo}
                  />
                </Grid>
              );
            })
          }
        </Grid>
      </Paper>
    </Slide>
  );
};

const styles = createStyles({});

export default withStyles(styles)(AvailableLogos);
