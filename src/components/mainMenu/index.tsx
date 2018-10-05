import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  MenuList,
  MenuItem,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faHockeyPuck } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'src/store/rootReducers';
import { isLogosAvailableSelector } from 'src/store/user/store/selectors';

type Props = injectStateProps;

const mapStateToProps = (state: RootState) => ({
  access: isLogosAvailableSelector(state),
});

class MainMenu extends Component<Props, object> {
  public render() {
    const { access } = this.props;
    return (
      <MenuList className={'main-menu menu-list'}>
        <MenuItem className={'main-menu__item'}>
          <NavLink
            className={'main-menu__link menu-btn'}
            to="/drills"
            activeClassName={'main-menu__link--active'}
          >
            <FontAwesomeIcon icon={faHockeyPuck} className={'menu-btn__icon'}/>
            {/*<i className="fas fa-hockey-sticks" />*/}
            <span className={'menu-btn__text'}>My Drills</span>
          </NavLink>
        </MenuItem>
        {
          access
          &&
          <MenuItem className={'main-menu__item'}>
            <NavLink
              className={'main-menu__link menu-btn'}
              to="/logos"
              activeClassName={'main-menu__link--active'}
            >
              <FontAwesomeIcon icon={faFileImage} className={'menu-btn__icon'}/>
              <span className={'menu-btn__text'}>My Logos</span>
            </NavLink>
          </MenuItem>
        }
      </MenuList>
    );
  }
}

type injectStateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(MainMenu);
