export default (state = {
  showModal: false,
}, action) => {
  switch (action.type) {
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