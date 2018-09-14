import * as React from 'react';
import { Grid, Typography, createStyles, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = createStyles({
  card: {
    height: 280,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
    width: '100%',
    height: 200,
    backgroundColor: '#000',
  },
});
interface IAppProps {
  classes?: any;
}

const IApp: React.SFC<IAppProps> = props => {
  const { classes } = props;
  return (
    <>
      <Grid item md={12}>
        <Typography variant="headline">My Logos</Typography>
      </Grid>
      <Grid item md={12}>
        <Paper>
          <Grid container spacing={24}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
              return (
                <Grid key={index} item md={2}>
                  <Card className={classes.card}>
                    <CardMedia
                      component="img"
                      className={classes.media}
                      title="log"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="headline"
                        component="h2"
                      >
                        {`${item} NameLogo`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default withStyles(styles)(IApp);
