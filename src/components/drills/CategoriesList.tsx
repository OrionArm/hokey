import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core';
import { DrillCategory } from 'src/store/drils/model';

interface Props extends WithStyles<typeof styles> {
  categories: DrillCategory[];
  onSelectCategory: (id: string) => void;
}

interface State {
  selectedId: string | null;
}

const styles = (theme: Theme) =>
  createStyles({
    item: {
      paddingLeft: 24,
    },
    selectedItem: {
      borderLeft: `3px solid ${theme.palette.primary.main}`,
      paddingLeft: 21,
    },
    button: {
      fontSize: 30,
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
        {this.props.categories.map((category, i) => {
          return (
            <ListItem
              component="li"
              classes={{
                selected: classes.selectedItem,
                root: classes.item,
                button: classes.button,
              }}
              key={category.id}
              button
              selected={
                this.state.selectedId === category.id ||
                (this.state.selectedId === null && i === 0)
              }
              onClick={this.onSelect(category)}
            >
              <ListItemText primary={category.name} />
              <span
                style={{
                  fontSize: '1rem',
                  color: '#4d4d4d',
                  fontWeight: 400,
                  lineHeight: '1.5em',
                }}
              >
                {category.count}
              </span>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

export const CategoriesList = withStyles(styles)(ListComponent);
