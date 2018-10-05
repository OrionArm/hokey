import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SFC } from 'react';
import {
  Button,
  createStyles, Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { GenerateType } from 'src/components/drills/toolsPanel/ToolsPanel';

type Props = { selected: string, handleChange(e: string): void }
  & WithStyles<typeof styles>;

const BtnGeneratePremium: SFC<Props> = ({ selected, handleChange, classes }) => {
  const click = () => handleChange(selected);

  return <Button
    classes={{
      root: classes.wrapperBtn,
    }}
    onClick={click}
  >
    <FontAwesomeIcon
      icon={faSyncAlt}
      style={{ marginRight: 8 }}
    />
    {GenerateType.Generate}
  </Button>;
};

const styles = (theme: Theme) => {
  return createStyles({
    wrapperBtn: {
      borderLeft: theme.custom.border,
      background: theme.palette.action.disabledBackground,
      borderRadius: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: '100%',
    },
  });
};

export default withStyles(styles)(BtnGeneratePremium);
