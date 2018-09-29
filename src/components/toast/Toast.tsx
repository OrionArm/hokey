import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  createStyles,
  IconButton,
  Snackbar,
  SnackbarContent,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faCheckCircle,
  faInfoCircle,
  faExclamationCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'src/store/rootReducers';
import { toastActions, ToastType } from 'src/store/toast/actions';

const toastVariant = {
  [ToastType.Success]: 'success',
  [ToastType.Info]: 'info',
  [ToastType.Warning]: 'warning',
  [ToastType.Error]: 'error',
};

const variantIcon = {
  Success: faCheckCircle,
  Warning: faExclamationCircle,
  Error: faExclamationTriangle,
  Info: faInfoCircle,
  Close: faTimesCircle,
};

const mapStateToProps = (state: RootState) => ({
  toast: state.toast,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clear: () => dispatch(toastActions.clearToast()),
});

type Props = WithStyles<typeof styles> &
  injectDispatchProps &
  injectStateProps & {
    className?: string;
    rest?: any;
  };

const Toast: React.SFC<Props> = ({
  toast,
  clear,
  classes,
  className,
  rest,
}) => {
  const handleClose = () => clear();
  const { messages, isOpen, type } = toast;

  const Icon = icon => <FontAwesomeIcon icon={icon} />;
  const classStyle = classes[toastVariant[type]];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={isOpen}
      autoHideDuration={6000}
      // TransitionComponent={Fade}
      onClick={handleClose}
    >
      <SnackbarContent
        className={className ? `${className} ${classStyle}` : classStyle}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon type={variantIcon[type]} /> {messages}
          </span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <Icon type={variantIcon['Close']} />
          </IconButton>,
        ]}
        {...rest}
      />
    </Snackbar>
  );
};

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: palette.error.dark,
    },
    info: {
      backgroundColor: palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    closeButton: {},
  });

type injectDispatchProps = ReturnType<typeof mapDispatchToProps>;
type injectStateProps = ReturnType<typeof mapStateToProps>;
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Toast),
);
