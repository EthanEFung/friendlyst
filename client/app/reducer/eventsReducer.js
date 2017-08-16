module.exports = (state = {
  comments: []
}, action) => {
  switch (action.type) {
    case 'CREATE_EVENT':
      state = Object.assign({}, state, {
        events: [...state.comments, action.payload]
      })

      return state
    default:
      return state
  }
}
