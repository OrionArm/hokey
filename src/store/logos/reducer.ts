import { NormLogos } from 'src/store/logos/interface';
import * as fromActions from './actions';
import { LogoModel } from 'src/store/logos/model';

export const initialState = {
  logos: { '': new LogoModel() } as NormLogos,
  loading: false,
  error: false,
};
export type logosState = Readonly<typeof initialState>;

export const reducer = (
  state = initialState,
  action: fromActions.logosActions): logosState => {
  switch (action.type) {
    case fromActions.GET_LOGOS_REQUEST: {
      return ({ ...state, loading: true });
    }
    case fromActions.GET_LOGOS_SUCCESS: {
      const logos: NormLogos = action.payload.logos;
      return ({ ...state, logos, loading: false });
    }
    default:
      return state;
  }
};
