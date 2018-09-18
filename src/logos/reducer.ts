import * as fromActions from './actions';
import { LogoModel } from 'src/logos/model';

export const initialState = {
  logos: [new LogoModel()],
  loaded: false,
  error: false,
};
export type logosState = Readonly<typeof initialState>;

export const reducer = (
  state = initialState,
  action: fromActions.logosActions): logosState => {
  switch (action.type) {
    case fromActions.GET_LOGOS_SUCCESS: {
      const logos = action.payload.logos;

      return ({ ...state, logos });
    }
    default:
      return state;
  }
};
