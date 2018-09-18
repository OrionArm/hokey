import store from 'src/store/index';
import { hide, hideAll, show } from 'src/modal-juggler/reducer';
import { ModalNames } from 'src/modal-juggler/interface';

export const hideAllModal  = () => store.dispatch(hideAll());
export const addLogoModal  = () => store.dispatch(show(ModalNames.addLogo));
export const editLogoModal = () => store.dispatch(hide({ name: ModalNames.addLogo }));
export const successModal  = () => store.dispatch(hide({ name: ModalNames.success }));
