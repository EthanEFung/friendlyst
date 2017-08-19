import React from 'react';

const updateEntry = (isUpdatingEntry) => {

  console.log('updateEntry action', isUpdatingEntry)
  return {
    type: 'UPDATE_ENTRY',
    payload: isUpdatingEntry
  };
}


export default updateEntry;