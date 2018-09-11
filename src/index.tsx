import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { Root } from './root';

ReactDOM.render(
  <Root><App/></Root>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
