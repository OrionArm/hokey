import React, { SFC } from 'react';
import { withStyles, Typography, WithStyles, Theme } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import { RootState } from 'src/store/rootReducers';
import userActions from 'src/store/user/store/actions';

const mapStateToProps = (state: RootState) => ({
  userName: state.user.profile ? state.user.profile.last : '',
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  logOut: () => dispatch(userActions.logoutRequest()),
});

type Props = WithStyles<typeof styles> & injectDispatchProps & injectStateProps;
const Profile: SFC<Props> = ({ userName, logOut, classes }) => {
  const onLogOut = () => logOut();
  if (userName) {
    return (
      <div className={classes.wrapperProfile}>
        <Typography
          variant="subheading"
          component="h3"
          className={classes.textUser}
        >
          {userName}
        </Typography>
        <a onClick={onLogOut} className={classes.textLogout}>
          {'( log out )'}
        </a>
      </div>
    );
  }
  return null;
};

const styles = (theme: Theme) => ({
  wrapperProfile: {
    display: 'flex',
    alignItems: 'center',
  },
  textUser: {
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
    fontWeight: 300,
  },
  textLogout: {
    fontFamily: 'Poppins,sans-serif',
    fontSize: '0.8rem',
    fontWeight: 300,
    lineHeight: '1.5em',
    color: theme.palette.text.secondary,
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
    textDecoration: 'none',
    transition: '0.3s',
    cursor: 'pointer',
    '&:hover, &:focus': {
      borderBottom: '1px solid transparent',
      textDecoration: 'none',
    },
    '&:active': {
      color: theme.palette.text.secondary,
      borderBottom: `1px solid ${theme.palette.text.secondary}`,
      textDecoration: 'none',
    },
  },
});

type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(Profile);
