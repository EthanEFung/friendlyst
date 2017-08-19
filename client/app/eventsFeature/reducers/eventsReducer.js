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
    default:
      return state
      break;
  }
}
