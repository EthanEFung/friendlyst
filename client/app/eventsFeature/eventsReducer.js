export default (state = {
  events: [],
  showModal: false,
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
    case 'OPEN_MODAL':
      state = Object.assign({}, state, {
       showModal: true
     }) 
    case 'CLOSE_MODAL':
      state = Object.assign({}, state, {
        showModal: false
      })
    default:
      return state
  }
}
