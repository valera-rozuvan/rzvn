import React, { ReactNode, JSX } from 'react';

import './style.scss';

function Modal(props: { children: ReactNode; activeModal: { name: string; }; }): JSX.Element {
  const { children, activeModal } = props;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-content__title">{activeModal.name}</div>
        <div className="modal-content__body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
