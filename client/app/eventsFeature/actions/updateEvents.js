import React from 'react';

const updateEvents = (newEvents) => ({
  type: 'UPDATE_EVENTS',
  payload: newEvents
});


export default updateEvents;