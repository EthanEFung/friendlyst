export default (state = {
  events: [],
}, action) => {
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
      console.log('this is the state of events', state.events);
      // state = Object.assign({}, state, {

      // })
      return;
      break;
    default:
      return state
      break;
  }
}
