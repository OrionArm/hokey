import { logoIdList, NormLogos } from 'src/store/logos/interface';
import * as fromActions from './actions';
import { LogoModel } from 'src/store/logos/model';
import produce from 'immer';

export const initialState = {
  logos: { '': new LogoModel() } as NormLogos,
  loading: false,
  error: false,
};
export type logosState = Readonly<typeof initialState>;

export const reducer = (
  state = initialState,
  action: fromActions.logosActions): logosState => {
  return produce<logosState>(state, draft => {
    switch (action.type) {
      case fromActions.GET_LOGOS_REQUEST: {
        return ({ ...state, loading: true });
      }
      case fromActions.GET_LOGOS_SUCCESS: {
        const logos: NormLogos = action.payload.logos;
        return ({ ...state, logos, loading: false });
      }
      case fromActions.ADD_LOGO_SUCCESS: {
        const logo: LogoModel = action.payload.logo;
        draft.logos[logo.id] = logo;
        return;
      }
      case fromActions.DELETE_LOGOS_SUCCESS: {
        const { logosIds }: logoIdList  = action.payload;
        logosIds.forEach(id => delete draft.logos[id]);
        return;
      }
      case fromActions.EDIT_LOGO_SUCCESS: {
        const { name, logoId }: fromActions.editLogoPayload = action.payload;
        draft.logos[logoId].name                            = name;
        return;
      }
      case fromActions.CHANGE_DEFAULT_LOGOS_SUCCESS: {
        const { logoId }: fromActions.changeDefaultLogoPayload = action.payload;
        const stateLogos = draft.logos;
        Object.keys(stateLogos).map(logoKey => {
          if (logoId !== logoKey) {
            stateLogos[logoKey].isMain = false;
          } else {
            stateLogos[logoId].isMain = true;
          }
        });
        return;
      }
      default:
        return state;
    }
  });

};
