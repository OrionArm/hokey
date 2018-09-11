import * as React from 'react';
import { ListMenu, ItemMenu } from './MainMenu.Style';
export interface MainMenuProps {}

export default class MainMenu extends React.Component<MainMenuProps, any> {
  public render() {
    return (
      <ListMenu>
        <ItemMenu>My drills</ItemMenu>
        <ItemMenu>My Logos </ItemMenu>
      </ListMenu>
    );
  }
}
