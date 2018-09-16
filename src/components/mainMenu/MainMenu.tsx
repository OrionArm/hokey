import React, { Component, SyntheticEvent } from 'react';
// import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

export interface IMainMenuProps {
  classes?: any;
}

export interface IMainMenuState {
  value: number;
  classes?: any;
}

class MainMenu extends Component<IMainMenuProps, IMainMenuState> {
  state = {
    value: 0,
  };

  handleChange = (event: SyntheticEvent<HTMLInputElement>, value: number) => {
    this.setState({ value });
  }

  public render() {
    // const { value } = this.state;
    return (
      <>
        <NavLink to="/" activeClassName="active">My drills</NavLink>
        <NavLink to="/logos" activeClassName="active">My Logos</NavLink>
        {/*<BottomNavigation value={value} onChange={this.handleChange} showLabels>*/}
          {/*<BottomNavigationAction label="My drills"/>*/}
          {/*<BottomNavigationAction label="My Logos"/>*/}
        {/*</BottomNavigation>*/}
      </>
    );
  }
}

export default MainMenu;
