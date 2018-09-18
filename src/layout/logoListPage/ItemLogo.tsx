import React from 'react';
import {
  Typography,
  createStyles,
  FormControlLabel,
  Radio,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { LogoModel } from 'src/logos/model';

const styles = (theme: any) =>
  createStyles({
    root: {
      color: '#fff',
      '&$checked': {
        color: '#fff',
      },
    },
    checked: {},

    labelRadio: {
      color: '#fff',
    },

    card: {
      height: 280,
      position: 'relative',
      width: 225,

      '&:hover $logosHoverBlock': {
        display: 'flex',
      },
    },

    logosHoverBlock: {
      display: 'none',
      width: '100%',
      height: 200,
      backgroundColor: 'rgba(78, 78, 78, 0.5)',
      position: 'absolute',
      top: 0,
      left: 0,
      padding: theme.spacing.unit * 3,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    HoverGroupButton: {
      display: 'inline-flex',
      flexDirection: 'column',
      marginLeft: 'auto',
    },

    media: {
      width: '100%',
      height: 200,
      backgroundColor: '#f1f1f1',
    },
  });

type Props = {
  classes?: any;
  item: LogoModel;
  pickDefaultLogo(logoId: string): void;
  editLogo(logoId: string): void;
  deleteLogo(logoId: string): void;
};
const LogoListPage: React.SFC<Props> = (
  { classes, item, pickDefaultLogo, editLogo, deleteLogo },
) => {
  const setDefault   = () => pickDefaultLogo(item.id);
  const onEditLogo   = () => editLogo(item.id);
  const onDeleteLogo = () => deleteLogo(item.id);

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        className={classes.media}
        title="log"
        image={item.url}
      />
      <div className={classes.logosHoverBlock}>
        <FormControlLabel
          value="Set as Default"
          classes={{
            label: classes.labelRadio,
          }}
          checked={item.isMain}
          control={
            <Radio
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
              onChange={setDefault}
            />
          }
          label="Set as Default"
        />
        <div className={classes.HoverGroupButton}>
          <Button
            color="secondary"
            onClick={onEditLogo}
          >
            Edit
          </Button>
          <Button
            color="primary"
            onClick={onDeleteLogo}
          >
            Delete
          </Button>
        </div>
      </div>
      <CardContent>
        <Typography align="center" variant="headline" component="h2">
          {clearName(item.name)}
        </Typography>
      </CardContent>
    </Card>
  );
};

function clearName(name: string) {
  return name.replace(/.png/gi, '');
}

export default withStyles(styles)(LogoListPage);
