import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  withStyles,
  createStyles,
} from '@material-ui/core';
import { DrillCategory } from '../../drills/model';

interface Props {
  classes?: any;
  categories: DrillCategory[];
  onSelectCategory: (id: string) => void;
}

interface State {
  selectedId: string | null;
}

const styles = createStyles({

});

class ListComponent extends Component<Props, State> {

  state = {
    selectedId: null,
  };

  onSelect = (category: DrillCategory) => (event: any) => {
    this.setState({ selectedId: category.id });
    this.props.onSelectCategory(category.id);
  }

  public render() {
    return (
      <List component="ul">
        {this.props.categories.map((category, i) => {
          return (<ListItem
            key={category.id}
            button
            // tslint:disable-next-line:max-line-length
            selected={this.state.selectedId === category.id || this.state.selectedId === null && i === 0}
            onClick={this.onSelect(category)}
          >
            <ListItemText primary={category.name} />
            <ListItemSecondaryAction>{category.count}</ListItemSecondaryAction>
          </ListItem>);
        })}
      </List>
    );
  }
}

export const CategoriesList = withStyles(styles)(ListComponent);
