import React from 'react';

const openModal = (showModal) => ({
  type: 'OPEN_MODAL',
  payload: showModal
})

export default openModal;