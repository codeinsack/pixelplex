import React from 'react';

import ModalContent from './ModalContent';

const Modal = () => (
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <ModalContent />
  </div>
);

export default Modal;
