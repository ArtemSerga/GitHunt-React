
var DEFAULT = {
  Insertion: null,
  AdField: null,
  targetIds: ['YANDEX_DIRECT', 'GOOGLE_ADWORDS'],
}


const active = (state=DEFAULT, action) => {

  switch (action.type) {

    case 'SET_ACTIVE':
      var newState = Object.assign({}, state)
      newState[action.component] = action.value
      return newState

    case 'TOGGLE':
      var newState = Object.assign({}, state)
      let curValue = newState[action.component]
      if (curValue.indexOf(action.value) == -1) {
        newState[action.component].push(action.value)
      } else {
        newState[action.component] = curValue.filter(v => v != action.value)
      }
      return newState

    default:
      return state
  }
}


export default active
