module.exports = (state = {
  events: []
}, action) => {
  switch (action.type) {
    case 'GET_STORED_EVENTS':
      state = Object.assign({}, state, {
        events: [...state.events]
      })
      return state  
    default:
      return state
  }
}
