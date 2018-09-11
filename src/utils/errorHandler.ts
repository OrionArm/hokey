import { AxiosError } from 'axios';
// import * as errorLogger from './errorLogger';

// function isArray(value) {
//   return value && typeof value === 'object' && value.constructor === Array;
// }

export function* errorHandler(error: AxiosError) {
  yield extractMessages(error);
  // Toasts.error(isArray(messages) ? messages[0] : messages);
}

export function* extractMessages(error: AxiosError) {
  if (!error.response) {
    return error.message;
  }

  const status = error.response.status;

  if (status === 422) {
    const errors          = error.response.data.errors;
    const keyFirstElement = Object.keys(errors)[0];

    return errors[keyFirstElement];
  }

  if (status === 401) {
    // yield put(commonActions.logout.REQUEST({}));
  }

  if (status === 500) {
    // errorLogger.captureException(error);
  }

  return error.response.data.message;
}
