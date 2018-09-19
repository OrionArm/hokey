import * as React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { RootState } from '../../store/rootReducers';
import { Link } from 'react-router-dom';

export interface Props {
  classes?: any;
  userName: string;
}

const styles = (theme: any) => ({
  wrapperProfile: {
    display: 'flex',
    alignItems: 'center',
  },

  textLogout: {
    color: theme.palette.primary.contrastText,
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    textDecoration: 'none',
    transition: '0.7s',
    '&:hover, &:focus': {
      borderBottom: '1px solid transparent',
      opacity: 0.7,
      outline: 'none',
      textDecoration: 'none',
      '&:active': {
        opacity: 1,
        borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
      },
    },
  },
});
class Profile extends React.Component<Props, any> {
  public render() {
    const { userName, classes } = this.props;

    return (
      <div className={classes.wrapperProfile}>
        <Typography variant="subheading" style={{ paddingRight: 8 }}>
          {userName}
        </Typography>
        <Link to="/login" className={classes.textLogout}>
          <Typography variant="body1">logout</Typography>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userName: state.user.profile.last,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Profile);
