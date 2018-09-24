import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  withStyles,
  createStyles,
  Badge,
} from '@material-ui/core';
import { DrillCategory } from './store/model';

interface Props {
  classes?: any;
  categories: DrillCategory[];
  onSelectCategory: (id: string) => void;
}

interface State {
  selectedId: string | null;
}

const styles = (theme: any) =>
  createStyles({
    selectedItem: {
      '&:hover $badge': {
        backgroundColor: theme.palette.primary.main,
      },
    },

    badge: {
      right: -10,
      fontSize: '1rem',
    },
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
    const { classes } = this.props;
    return (
      <List component="ul">
        {
          this.props.categories.map((category, i) => {
            return (
              <ListItem
                component="li"
                classes={{
                  root: classes.selectedItem,
                }}
                key={category.id}
                button
                // tslint:disable-next-line:max-line-length
                selected={
                  this.state.selectedId === category.id ||
                  (this.state.selectedId === null && i === 0)
                }
                onClick={this.onSelect(category)}
              >
                <ListItemText primary={category.name}/>
                <Badge
                  badgeContent={category.count}
                  color="default"
                  classes={{ badge: classes.badge }}
                >
                  <ListItemSecondaryAction/>
                </Badge>
              </ListItem>
            );
          })}
      </List>
    );
  }
}

export const CategoriesList = withStyles(styles)(ListComponent);
