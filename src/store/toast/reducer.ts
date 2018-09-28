import * as fromActions from './actions';

export const initialState = {
  messages: '',
  type: fromActions.ToastType.Info,
  isOpen: false,
};
export type toastState = Readonly<typeof initialState>;

export const reducer = (
  state = initialState,
  action: fromActions.toastActions): toastState => {
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
    default: return state;
  }
};
