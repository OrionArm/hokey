import React, { SFC } from 'react';
import Header from 'src/components/header/Header';
import { Loading, InCenter } from 'src/UI';

type Props = {};
const PreloadPage: SFC<Props> = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '250px' }}>
        <InCenter>
          <Loading />
        </InCenter>
      </div>
    </>
  );
};

export default PreloadPage;
