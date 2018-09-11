import * as React from 'react';
import { Categories } from './styled';

export interface CategoriesProps {}

export default class CategoriesBar extends React.Component<
  CategoriesProps,
  any
> {
  public render() {
    return <Categories>Categories</Categories>;
  }
}
