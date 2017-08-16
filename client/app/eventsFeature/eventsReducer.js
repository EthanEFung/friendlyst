module.exports = (state = {
  comments: []
}, action) => {
  switch (action.type) {
    case 'RENDER_EVENTS_PAGE':
      state = Object.assign({}, state, {
        events: [...state.events, action.payload]
      })
      return state
    default:
      return state
  }
}
