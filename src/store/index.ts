import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';

import rootReducers from './rootReducers';
import rootSaga from './rootSaga';
// import userSaga from 'src/user/saga';

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

/*
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './rootReducers';
// import rootSaga from './rootSaga';
import userSaga from 'src/user/saga';

const sagaMiddleware = createSagaMiddleware();
const middleware     = [sagaMiddleware];
const store: any = createStore(
  rootReducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddleware.run(userSaga);

export default store;
*/
