import React from 'react';

const deleteEvent = (event) => ({
  type: 'DELETE_EVENT',
  payload: event
});


export default deleteEvent;