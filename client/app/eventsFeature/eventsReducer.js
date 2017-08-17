export default (state = {
  events: []
}, action) => {
  switch (action.type) {
    case 'GET_STORED_EVENTS':
      state = Object.assign({}, state, {
        events: [...action.payload]
      })
      return state  
    default:
      return state
  }
}
