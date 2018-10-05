import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SFC } from 'react';
import {
  Button,
  createStyles,
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
      root: classes.rootBtn,
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

const styles = () => {
  return createStyles({
    rootBtn: {
      textTransform: 'capitalize',
      padding: 0,
    },
  });
};

export default withStyles(styles)(BtnGeneratePremium);
