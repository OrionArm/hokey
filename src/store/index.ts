import createBrowserHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';

import rootReducer, { RootState } from './rootReducers';
import rootSaga from './rootSaga';

export const history = createBrowserHistory();
const sagaMiddleware = reduxSaga();
const routeMiddleware = routerMiddleware(history);
let middleware = [sagaMiddleware, routeMiddleware];
const rootReducerWithRouter = connectRouter(history)(rootReducer);

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({ diff: true, collapsed: true });
  middleware   = [...middleware, logger];
}

const createCustomStore: Store<RootState> = (() => {
  const store: any = createStore(
    rootReducerWithRouter,
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
