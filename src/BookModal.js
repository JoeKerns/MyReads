import React from 'react';
import Modal from 'react-modal';

const BookModal = (props) => (
    <Modal
      onRequestClose={props.handleModalClose}
      isOpen={!!props.modalContent} // !! converts string/undefined to boolean
      contentLabel="Modal Content"
      closeTimeoutMS={200}
      className="modal">
      <h3 className="modal_title">Book Operation</h3>
      { props.modalContent && <p className="modal__body">{props.modalContent}</p>}
      <button onClick={props.handleModalClose} className="button">OK!</button>
    </Modal>
  );

  export default BookModal;