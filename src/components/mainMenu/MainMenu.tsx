import * as React from 'react';
export interface MainMenuProps {}
import styledComponents from 'styled-components';

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

export const ListMenu = styledComponents.ul`
  margin: 0
  padding-left: 0
  list-style: none
  display:flex;
`;
export const ItemMenu = styledComponents.li`
  margin-right: 20px
`;
