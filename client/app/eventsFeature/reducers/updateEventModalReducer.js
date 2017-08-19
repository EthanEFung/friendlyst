export default (state = {
  prevEvent: {},
}, action) => {
  switch (action.type) {
    case 'POPULATE_EVENT_VALUES':
      state = Object.assign({}, state, {
        prevEvent:  action.payload 
      })
      return state
      break;
    default:
      return state
      break;
  }
}