export default (state = {
  showModal: false,
}, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      state = Object.assign({}, state, {
        showModal: action.payload
      }) 
    return state
    break;
    case 'CLOSE_MODAL':
      state = Object.assign({}, state, {
        showModal: action.payload
      })
    return state  
    break;
    default:
      return state
      break;
  }
}