import React, { Component } from 'react';
import {
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  withStyles,
  createStyles,
} from '@material-ui/core';
export interface ICategoriesProps {
  classes?: any;
}

export interface ICategoriesState {
  category: string;
}

const styles = createStyles({
  select: {
    paddingLeft: 8,
    paddingTop: 0,
    paddingBottom: 0,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 4,
  },
  rootBtn: {
    textTransform: 'capitalize',
    padding: 0,
  },
  rootIconBtn: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 0,
  },
});

class CategoriesBar extends Component<ICategoriesProps, any> {
  state = {
    category: 'public',
    selectedIndex: 1,
  };

  handleChange = (event: any) =>
    this.setState({
      [event.target.name]: event.target.value,
    })

  handleListItemClick = (event: any, index: number) => {
    this.setState({ selectedIndex: index });
  }

  public render() {
    const { classes } = this.props;
    return (
      <Paper style={{ padding: 20 }}>
        <Button
          fullWidth
          classes={{
            root: classes.rootBtn,
          }}
        >
          <Select
            value={this.state.category}
            onChange={this.handleChange}
            name="category"
            disableUnderline
            style={{
              width: '100%',
            }}
            classes={{
              select: classes.select,
              root: classes.root,
            }}
          >
            <MenuItem value="public">Public Categories</MenuItem>
            <MenuItem value="custom">Custom Categories</MenuItem>
          </Select>
        </Button>

        <List component="ul">
          <ListItem
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}
          >
            <ListItemText primary="1 on 0" />
            <ListItemSecondaryAction>10</ListItemSecondaryAction>
          </ListItem>
          <ListItem
            button
            selected={this.state.selectedIndex === 1}
            onClick={event => this.handleListItemClick(event, 1)}
          >
            <ListItemText primary="1 on 1" />
            <ListItemSecondaryAction>10</ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(CategoriesBar);
