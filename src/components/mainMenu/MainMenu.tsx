import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MenuList,
  MenuItem,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faHockeyPuck  } from '@fortawesome/free-solid-svg-icons';

export interface IMainMenuProps {
  classes?: any;
}

export interface IMainMenuState {
  value: number;
  classes?: any;
}

class MainMenu extends Component<IMainMenuProps, IMainMenuState> {
  public render() {
    return (
      <MenuList className={'main-menu menu-list'}>
        <MenuItem className={'main-menu__item'}>
          <NavLink
            className={'main-menu__link menu-btn'}
            to="/drills"
            activeClassName={'main-menu__link--active'}
          >
            <FontAwesomeIcon icon={faHockeyPuck} className={'menu-btn__icon'} />
            {/*<i className="fas fa-hockey-sticks" />*/}
            <span className={'menu-btn__text'}>My Drills</span>
          </NavLink>
        </MenuItem>
        <MenuItem className={'main-menu__item'}>
          <NavLink
            className={'main-menu__link menu-btn'}
            to="/logos"
            activeClassName={'main-menu__link--active'}
          >
            {/*<i className={'fa'} />*/}
            <FontAwesomeIcon icon={faFileImage} className={'menu-btn__icon'} />
            <span className={'menu-btn__text'}>My Logos</span>
          </NavLink>
        </MenuItem>
      </MenuList>
    );
  }
}

export default MainMenu;
