import React, { Component } from 'react';
import { Categories } from './styled';

export interface CategoriesProps {}

export default class CategoriesBar extends Component<CategoriesProps, any> {
  public render() {
    return <Categories>Categories</Categories>;
  }
}
