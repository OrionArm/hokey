import React, { SFC } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import { RootState } from 'src/store/rootReducers';
import userActions from 'src/store/user/store/actions';

const mapStateToProps    = (state: RootState) => ({
  userName: state.user.profile ? state.user.profile.last : '',
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  logOut: () => dispatch(userActions.logoutRequest()),
});

type Props = { classes?: any } & injectDispatchProps & injectStateProps;
const Profile: SFC<Props> = ({ userName, logOut, classes }) => {
  const onLogOut = () => logOut();
  if (userName) {
    return (
      <div className={'app-toolbar__info'}>
        <h3 className={'app-toolbar__username'}>
          {userName}
        </h3>
        <div
          className={'app-toolbar__action'}
          onClick={onLogOut}
        >
          <p
            className={`${classes.textLogout} app-toolbar__link`}
            // className={'app-toolbar__link'}
          >
            (log out)
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const styles = (theme: any) => ({
  wrapperProfile: {
    display: 'flex',
    alignItems: 'center',
  },

  textLogout: {
    color: theme.palette.text.secondary,
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

type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Profile);
