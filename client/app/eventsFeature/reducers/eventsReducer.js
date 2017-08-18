export default (state = {
  events: [],
}, action) => {
  switch (action.type) {
    case 'GET_STORED_EVENTS':
      state = Object.assign({}, state, {
        events: [...action.payload]
      })
      return state
    case 'CREATE_NEW_EVENT':
      state = Object.assign({}, state, {
        events: [action.payload, ...state.events]
      })
    default:
      return state
  }
}
