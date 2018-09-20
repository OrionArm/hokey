import React, { CSSProperties, SFC } from 'react';
import { CircularProgress, Fade } from '@material-ui/core';
import InCenter from 'src/UI/InCenter';

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

export default Loading;
