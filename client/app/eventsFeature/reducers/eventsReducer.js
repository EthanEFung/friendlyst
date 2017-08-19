export default (state = {
  events: [],
}, action) => {
  let newEvents = state.events.slice();
  switch (action.type) {
    case 'GET_STORED_EVENTS':
      state = Object.assign({}, state, {
        events: [...action.payload]
      })
      return state;
      break;
    case 'CREATE_NEW_EVENT':
      state = Object.assign({}, state, {
        events: [action.payload, ...state.events]
      })
      return state;
      break;
    case 'UPDATE_EVENTS':
      for (let i = 0; i < newEvents.length; i++) {
        if (newEvents[i].id === action.payload.id) {
          newEvents.splice(i, 1, action.payload);
        }
      }
      state = Object.assign({}, state, {
        events: newEvents
      })
      return state;
      break;
    case 'DELETE_EVENT':
      for (let i = 0; i < newEvents.length; i++) {
        if (newEvents[i].id === action.payload.id) {
          newEvents.splice(i, 1);
        }
      }
      state = Object.assign({}, state, {
        events: newEvents
      })
      return state;
      break;
    default:
      return state
      break;
  }
}
