import {
  createStyles,
  Grid,
  withStyles,
  Typography,
  Paper,
  WithStyles,
  Theme,
  Slide,
} from '@material-ui/core';
import { compose } from 'redux';
import React, { Component } from 'react';
import { DrillDetailed } from 'src/store/drils/model';
import { NormLogos } from 'src/store/logos/interface';
import LogoItem from '../logos/LogoItem';

type Props = {
  selectedDrill: DrillDetailed | null;
  logos: NormLogos;
  isHoverOpen: null | string;
  closeHover: any;
  handleHover: (id: string) => void;
  regenerateWithNewLogo(logoId: string): void;
} & WithStyles<typeof styles>;

class AvailableLogos extends Component<Props> {
  render() {
    const { logos, regenerateWithNewLogo, classes } = this.props;
    const logosIds: string[] = Object.keys(logos);

    return (
      <Slide direction="up" in>
        <Paper component="section" style={{ padding: 24 }}>
          <Grid container spacing={24} direction="column">
            <Grid item>
              <Typography
                className={classes.title}
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
                    closeHover={this.props.closeHover}
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

const styles = (theme: Theme) =>
  createStyles({
    title: {
      borderBottom: theme.custom.border,
      paddingBottom: theme.spacing.unit,
    },
  });

export default compose(withStyles(styles))(AvailableLogos);
