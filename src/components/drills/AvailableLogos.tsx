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
import { NormLogos } from 'src/store/logos/interface';

import ItemLogo from '../logos/LogoItem';

type Props = {
  classes: any;
  selectedDrill: DrillDetailed | null;
  logos: NormLogos;
  regenerateWithNewLogo(logoId: string): void;
};

const AvailableLogos: SFC<Props> = ({ logos, regenerateWithNewLogo }) => {
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
          {
            logosIds.map(id => {
              return (
                <Grid item key={id}>
                  <ItemLogo
                    logo={logos[id]}
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
