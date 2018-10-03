import { ToastType } from 'src/store/toast/actions';
import * as fromActions from './actions';

export const initialState = {
  isOpen: false,
  messages: '',
  type: null as ToastType | null,
};
export type toastState = Readonly<typeof initialState>;

export const reducer = (
  state = initialState,
  action: fromActions.toastActions,
): toastState => {
  switch (action.type) {
    case fromActions.SHOW_TOAST: {
      return { ...state, ...action.payload, isOpen: true };
    }
    case fromActions.CLEAR_TOAST: {
      return {
        ...state,
        ...initialState,
      };
    }
    default:
      return state;
  }
};
