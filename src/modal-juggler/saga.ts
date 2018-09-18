import { select, takeEvery } from 'redux-saga/effects';

import { getModals } from 'src/store/selectors';
import {
  HIDE,
  HIDE_ALL,
  SHOW,
  SHOW_AND_HIDE_ALL,
  SHOW_AND_HIDE_SPECIFIED,
} from 'src/modal-juggler/reducer';

function* sagaModalJuggler() {
  const modals = yield select(getModals);

  document.documentElement.style.overflow = modals.length > 0 ? 'hidden' : 'auto';
}

function* watcherModalJuggler() {
  yield takeEvery(
    [SHOW, HIDE, HIDE_ALL, SHOW_AND_HIDE_ALL, SHOW_AND_HIDE_SPECIFIED],
    sagaModalJuggler,
  );
}

export {
  sagaModalJuggler,
};

export default [watcherModalJuggler];
