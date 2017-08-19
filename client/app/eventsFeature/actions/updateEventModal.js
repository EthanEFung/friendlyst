import React from 'react';

const updateEventModal = (prevEvent) => ({
    type: 'POPULATE_EVENT_VALUES',
    payload: prevEvent
  })


export default updateEventModal;