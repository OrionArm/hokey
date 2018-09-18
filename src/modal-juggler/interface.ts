export enum ModalNames {
  editLogo = 'editLogo',
  addLogo = 'addLogo',
  success      = 'success',
}

export interface IModal {
  name: ModalNames;
  zIndex: number;
}

export interface IModalJugglerState {
  modals: IModal[];
  meta?: string;
}
