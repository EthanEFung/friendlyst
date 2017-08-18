export default (state = {
  showModal: false,
}, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      state = Object.assign({}, state, {
        showModal: action.payload
     }) 
    case 'CLOSE_MODAL':
      state = Object.assign({}, state, {
        showModal: action.payload
      })
    default:
      return state
  }
}