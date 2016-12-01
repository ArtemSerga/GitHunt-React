const DEFAULT = {
  focus: {},
  hover: {},
  click: {},
}


const state = (state=DEFAULT, action) => {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'focus':
      newState['focus'][action.component] = action.id
      return newState
    case 'hover':
      newState['hover'][action.component] = action.id
      return newState
    case 'click':
      newState['click'][action.component] = action.id
      return newState
  }
  return state
}


export default state
