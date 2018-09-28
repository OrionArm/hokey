import { ActionsUnion } from 'src/utils/typedAction/action';
import { createAction } from 'src/utils/typedAction/createAction';

export enum ToastType {
  Error   = 'Error',
  Warning = 'Warning',
  Info    = 'Info',
  Success = 'Success',
}

export const SHOW_TOAST  = '[toast] SHOW_TOAST';
export type showToast = ReturnType<typeof showToast>;
const showToast = (messages: string, type: ToastType = ToastType.Info) =>
  createAction(SHOW_TOAST, ({ messages, type }),
);

export const CLEAR_TOAST = '[toast] CLEAR_TOAST';
export type clearToast = ReturnType<typeof showToast>;
const clearToast = () => createAction(CLEAR_TOAST);

export const toastActions = {
  clearToast,
  showToast,
};

export type toastActions = ActionsUnion<typeof toastActions>;
export default toastActions;
