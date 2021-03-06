import * as React from 'react';
import { DownloadDrill, CurrentLoadingType } from 'src/store/drils/model';

import {
  IconButton,
  WithStyles,
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { PreloadDownload } from '../../UI/Loading';

interface Props extends WithStyles<typeof styles> {
  onDownload: any;
  loadingData: DownloadDrill;
  current: CurrentLoadingType;
  checkedIds?: string[];
  drillsId?: string;
  hasAnimation?: boolean;
}
const handleDisableIconBtn = (variants: boolean) => {
  const values = Object.values(variants);
  const normalizeString = values.map(
    value => (typeof value === 'string' ? true : value),
  );
  return normalizeString.includes(true);
};

const ControlBtn: React.SFC<Props> = ({
  onDownload,
  loadingData,
  checkedIds,
  current,
  hasAnimation,
  drillsId,
  children,
  classes,
}) => {
  const isAll = () => current.substring(0, 3) === 'all';
  const handlePropsDisabled = () => {
    if (isAll() && checkedIds) {
      return checkedIds.length === 0;
    }
    if (
      current === CurrentLoadingType.selfVideo ||
      current === CurrentLoadingType.regenerate
    ) {
      return hasAnimation;
    }

    return;
  };
  const handlePreloadСondition = () =>
    isAll()
      ? loadingData.loading[current]
      : loadingData.loading[current] === drillsId &&
        loadingData.loading[current];
  return (
    <>
      <IconButton
        className={isAll() ? '' : classes.iconBtn}
        onClick={onDownload}
        disabled={
          handlePropsDisabled() ||
          handleDisableIconBtn(Boolean(loadingData.loading))
        }
      >
        {children}
      </IconButton>
      {current !== CurrentLoadingType.regenerate &&
        handlePreloadСondition() && <PreloadDownload />}
    </>
  );
};

const styles = (theme: Theme) => {
  return createStyles({
    iconBtn: {
      width: 50,
      height: 50,
      '&:disabled': {
        backgroundColor: '#eeeeee',
      },
      '&:not(:disabled)': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
  });
};

export default withStyles(styles)(ControlBtn);
