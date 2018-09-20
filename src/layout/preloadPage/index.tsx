import React, { SFC } from 'react';
import Loading from 'src/UI/Loading';
import Header from 'src/layout/header/Header';
import InCenter from 'src/UI/InCenter';

type Props = {};
const PreloadPage: SFC<Props> = props => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '250px' }}>
        <InCenter>
          <Loading/>
        </InCenter>
      </div>
    </>
  );
};

export default PreloadPage;
