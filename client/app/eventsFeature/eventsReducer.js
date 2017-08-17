export default (state = {
  events: [],
  event: {}
}, action) => {
  switch (action.type) {
    case 'GET_STORED_EVENTS':
      state = Object.assign({}, state, {
        events: [...action.payload]
      })
      return state
    case 'CREATE_NEW_EVENT':
      state = Object.assign({}, state, {
        event: action.payload
      })  
    default:
      return state
  }
}
