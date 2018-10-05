import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import React, { SFC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  createStyles,
  MenuItem,
  Select,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';

import { GenerateType } from 'src/components/drills/toolsPanel/ToolsPanel';

type Props = { selected: string, handleChange(e: string): void }
  & WithStyles<typeof styles>;

const BtnGeneratePremium: SFC<Props> = ({ selected, handleChange, classes }) => {
  const click = () => handleChange(selected);

  return (
    <Select
      value={selected}
      onChange={click}
      name="selected"
      autoWidth
      classes={{
        root: classes.rootSelect,
        select: classes.select,
      }}
      renderValue={
        value => {
          return <>
            <FontAwesomeIcon
              icon={faSyncAlt}
              style={{ marginRight: 8 }}
            />
            {value}
          </>;
        }
      }
    >
      <MenuItem value={GenerateType.Generate}>
        {GenerateType.Generate}
      </MenuItem>
      <MenuItem value={GenerateType.GenerateWithNewLogo}>
        {GenerateType.GenerateWithNewLogo}
      </MenuItem>
    </Select>
  );
};

const styles = (theme: Theme) => {
  return createStyles({
    rootSelect: {
      fontSize: '0.875rem',
    },
    select: {
      paddingLeft: theme.spacing.unit,
      paddingTop: 0,
      paddingBottom: 0,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      borderLeft: theme.custom.border,
      borderBottomLeftRadius: theme.shape.borderRadius,
    },
    rootBtn: {
      textTransform: 'capitalize',
      padding: 0,
    },
  });
};

export default withStyles(styles)(BtnGeneratePremium);
