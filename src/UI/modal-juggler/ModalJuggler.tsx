import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { IModal, ModalNames } from 'src/modal-juggler/interface';
import { hide } from 'src/modal-juggler/reducer';
import { getModals } from 'src/store/selectors';
import { RootState } from 'src/store/rootReducers';
import { Dispatch } from 'redux';

export interface InitialModalProps {
  name: ModalNames;
  style?: object;
  useOnRequestClose?: boolean;
  isLast?: boolean;
}

export interface IModalWrapProps {
  name: ModalNames;
  modals: IModal[];
  style?: object;
  useOnRequestClose?: boolean;
  hide: (name: ModalNames) => void;
}

const defaultStyle = {
  content: {
    position: 'unset',
    top: 'unset',
    right: 'unset',
    bottom: 'unset',
    left: 'unset',
    overflow: 'unset',
    background: 'none',
    width: '100%',
    minHeight: '100%',
    borderRadius: '0',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
  },
  overlay: {
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: 'rgba(0, 0, 0, .75)',
  },
} as any;

Modal.setAppElement('body');

class ModalJuggler extends React.PureComponent<IModalWrapProps> {

  get modal(): IModal | undefined {
    return this.props.modals.filter((modal: IModal) => {
      return modal.name === this.props.name;
    })[0];
  }

  get isOpen() {
    return !!this.modal; // Convert to boolean
  }

  // get isModalLast() {
  //   let index = this.props.modals.indexOf(this.modal);
  //   index++; // Because the index begins with 0
  //
  //   return this.props.modals.length === index;
  // }

  onRequestClose() {
    return this.props.useOnRequestClose && (() => this.props.hide(this.props.name));
  }

  get style() {
    return this.props.style || defaultStyle;
  }

  get modifyStyle() {
    const style = this.style;
    // const overlay = style && style.overlay &&
    // style.overlay.backgroundColor || 'rgba(0, 0, 0, 0)';

    return {
      ...style,
      overlay: {
        ...style.overlay,
        zIndex: this.modal ? this.modal.zIndex : 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
    };
  }

  render() {
    return (
      <Modal
        isOpen={this.isOpen}
        style={this.modifyStyle}
        onRequestClose={this.onRequestClose}
      >
        {this.props.children}
      </Modal>
    );
  }
}

const mapStateToProps    = (state: RootState) => ({
  modals: getModals(state),
});
// type ModalNamysKey = ModalNames.login | ModalNames.registration | ModalNames.success
const mapDispatchToProps = (dispatch: Dispatch) => ({
  hide: (name: ModalNames) => dispatch(hide({ name })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalJuggler);
