import * as React from 'react';
import ModalJuggler from 'src/UI/modal-juggler/ModalJuggler';
import { ModalNames } from 'src/modal-juggler/interface';
import { hideAllModal } from 'src/modal-juggler/modalTriggers';

interface ISuccess {
}

const SuccessModal: React.SFC<ISuccess> = ({}) => {
  const onClose = () => {
    hideAllModal();
  };
  return (
    <ModalJuggler
      name={ModalNames.success}
      useOnRequestClose={true}
    >
      <button
        type="submit"
        onClick={onClose}
      > Continue
      </button>

    </ModalJuggler>
  );
};

export default SuccessModal;
