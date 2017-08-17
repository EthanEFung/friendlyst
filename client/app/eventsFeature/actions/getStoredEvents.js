import React from 'react';

const getStoredEvents = (events) => ({
  type: 'GET_STORED_EVENTS',
  payload: events
});

export default getStoredEvents;