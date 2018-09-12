import React, { Component } from 'react';
import { Select, MenuItem } from '@material-ui/core';
export interface CategoriesProps {}

export interface ICategoriesState {
  category: string;
}

export default class CategoriesBar extends Component<CategoriesProps, any> {
  state = {
    category: 'public',
  };

  handleChange = (event: any) =>
    this.setState({
      [event.target.name]: event.target.value,
    })

  public render() {
    return (
      <Select
        value={this.state.category}
        onChange={this.handleChange}
        name="category"
        style={{ width: '100%' }}
      >
        <MenuItem value="public">Public Categories</MenuItem>
        <MenuItem value="custom">Custom Categories</MenuItem>
      </Select>
    );
  }
}
