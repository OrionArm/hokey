import { createActionGenerator, IAsyncAction } from '../utils/actionsGenerator';

const createAsyncAction = createActionGenerator('userActions');
const setTokenToStorage     = createAsyncAction('SELECT_SUBJECT');

export interface IUserActionsActions {
  setTokenToStorage: IAsyncAction<{token: string}>;
}

export const userActions: IUserActionsActions = {
  setTokenToStorage,
};

export default userActions;
