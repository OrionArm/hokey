// import * as fromActions from 'src/user/actions';
import { IModal, IModalJugglerState, ModalNames } from 'src/modal-juggler/interface';
import { createAction } from 'src/utils/typedAction/createAction';
import { ActionsUnion } from 'src/utils/typedAction/action';

export const SHOW = '[modal] SHOW';
export type show = ReturnType<typeof show>;
const show = (name: ModalNames) => createAction(SHOW, name);

export const HIDE = '[modal] HIDE';
export type hide = ReturnType<typeof hide>;
const hide = (payload: { name: ModalNames, meta?: string }) => createAction(HIDE, payload);

export const HIDE_ALL = '[modal] HIDE_ALL';
export type modalHideAll = ReturnType<typeof modalHideAll>;
const modalHideAll = () => createAction(HIDE_ALL);

export const SHOW_AND_HIDE_ALL = '[modal] SHOW_AND_HIDE_ALL';
export type showAndHideAll = ReturnType<typeof showAndHideAll>;
const showAndHideAll  = (name: ModalNames) => createAction(SHOW_AND_HIDE_ALL, name);

export const SHOW_AND_HIDE_SPECIFIED = '[modal] SHOW_AND_HIDE_SPECIFIED';
export type showAndHideSpecified = ReturnType<typeof showAndHideSpecified>;
const showAndHideSpecified  = (payload: { name: ModalNames, specefied: ModalNames[] }) => {
  return createAction(SHOW_AND_HIDE_SPECIFIED, payload);
};

export const modalActions = {
  show,
  hide,
  modalHideAll,
  showAndHideAll,
  showAndHideSpecified,
};
export type modalActions = ActionsUnion<typeof modalActions>;

export default modalActions;

const initialState = {
  modals: [],
  meta: '',
};

export const reducerRefactor = (state = initialState, action: modalActions): IModalJugglerState => {
  switch (action.type) {
    case SHOW: {
      const modal: IModal = { name: action.payload, zIndex: state.modals.length + 100 };
      return {
        ...state,
        modals: [...state.modals, modal],
      };
    }
    case HIDE: {
      return {
        ...state,
        modals: state.modals.filter((modal: IModal) => modal.name !== action.payload.name),
        meta: action.payload.meta,
      };
    }
    case HIDE_ALL: {
      return {
        ...state,
        modals: [],
        meta: '',
      };
    }
    case SHOW_AND_HIDE_ALL: {
      return {
        ...state,
        modals: [{ name: action.payload, zIndex: 100 }],
        meta: '',
      };
    }
    // case SHOW_AND_HIDE_SPECIFIED: {
    //   const filteredModals = state.modals.filter((modal: IModal) => {
    //     return action.payload.specefied.indexOf(modal.name) === -1; // If not found, then true
    //   });
    //   return {
    //     ...state,
    //     meta: '',
    //     modals: filteredModals.concat({
    //       name: action.payload.name,
    //         zIndex: filteredModals.length
    //       }),
    //   };
    // }
    default:
      return state;
  }
};
