import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { customStorage } from 'src/utils/customStorage';
import * as fromActions from './actions';

function* watcherToken() {
  yield [
    takeEvery(fromActions.SET_TO_STATE, setToState),
    takeEvery(fromActions.SET_TO_RESPONSE, setToResponse),
    takeEvery(fromActions.SET_TO_STORAGE, saveTokenInStorage),
    takeEvery(fromActions.CLEAR_TOKEN, clearToken),
  ];
}

function setToState(action: fromActions.setToState) {
  const token = action.payload;
  customStorage.setAndRememberItem('token', token);
}

function setToResponse(action: fromActions.setToResponse) {
  const token = action.payload;
  axios.defaults.headers.common.jwt = `Bearer ${token}`;
}

function saveTokenInStorage(action: fromActions.setToStorage) {
  const { token, isRememberMe } = action.payload;

  if (isRememberMe) {
    customStorage.setAndRememberToken(token);
  } else {
    customStorage.setToken(token);
  }
}

function clearToken() {
  customStorage.clear();
  axios.defaults.headers.common.authorization = '';
  window.location.href                        = '/';
}

export default watcherToken;
