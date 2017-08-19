import React from 'react';

const closeModal = (showModal) => ({
  type: 'CLOSE_MODAL',
  payload: showModal
});

export default closeModal;