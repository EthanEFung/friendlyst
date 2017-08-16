import React from 'react';

const getStoredEvents = () => (
  dispatch({
    type: 'GET_STORED_EVENTS'
  })
);

export default getStoredEvents;