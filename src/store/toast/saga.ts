import { put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as fromActions from './actions';

function* watcher() {
  yield takeLatest(fromActions.SHOW_TOAST, hideToast);
}

function* hideToast(action: fromActions.toastActions): IterableIterator<any> {
  yield delay(3000);
  yield put(fromActions.toastActions.clearToast());
}

export default watcher;
