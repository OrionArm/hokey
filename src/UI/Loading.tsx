import React, { CSSProperties, SFC } from 'react';
import { CircularProgress, Fade } from '@material-ui/core';
import InCenter from './InCenter';

type Props = {
  style?: CSSProperties;
  classes?: any;
};
export const Loading: SFC<Props> = props => {
  return (
    <div style={{ height: '100%' }} {...props}>
      <InCenter>
        <Fade in timeout={500}>
          <CircularProgress size={60} />
        </Fade>
      </InCenter>
    </div>
  );
};

export const PreloadDownload: SFC<Props> = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <Fade in>
        <CircularProgress color="secondary" size={50} />
      </Fade>
    </div>
  );
};
