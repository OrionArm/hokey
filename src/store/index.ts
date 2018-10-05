import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import createBrowserHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';

import rootReducers from './rootReducers';
import rootSaga from './rootSaga';
import { RootState } from 'src/store/rootReducers';

export const history = createBrowserHistory();
const sagaMiddleware = reduxSaga();

const routeMiddleware = routerMiddleware(history);
let middleware        = [sagaMiddleware, routeMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({ diff: true, collapsed: true });
  middleware   = [...middleware, logger];
}

const createCustomStore: Store<RootState> = (() => {
  const store: any = createStore(
    connectRouter(history)(rootReducers),
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
