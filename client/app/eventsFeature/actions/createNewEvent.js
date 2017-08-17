import React from 'react';

const createNewEvent = (event) => ({
  type: 'CREATE_NEW_EVENT',
  payload: event
});

export default createNewEvent;