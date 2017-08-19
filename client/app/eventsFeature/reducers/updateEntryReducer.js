export default (state = {
  isUpdatingEntry: false,
}, action) => {
  switch (action.type) {
    case 'UPDATE_ENTRY':
      state = Object.assign({}, state, {
        isUpdatingEntry:  action.payload 
      })
      return state
      break;
    default:
      return state
      break;
  }
}