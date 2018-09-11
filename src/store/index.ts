import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';

import rootReducers from './rootReducers';
import rootSaga from './rootSaga';

const sagaMiddleware = reduxSaga();
let middleware       = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware       = [...middleware];
}

const createCustomStore = (() => {
  const store: any = createStore(
    rootReducers,
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };
  store.runSagaTask();

  return store;
})();

export default createCustomStore;
