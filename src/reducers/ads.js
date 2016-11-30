import { v4 } from 'node-uuid'


const getEmptyAd = (id) => {
  return {
    id: id,
    headline: '',  // Yandex Direct
    headline1: '',  // Google AdWords
    headline2: '',  // Google AdWords
    body: '',  // Common
  }
}


const ads = (state={}, action) => {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'ADD_AD':
      newState[action.id] = getEmptyAd(action.id)
      return newState

    case 'EDIT_AD':
      newState[action.id][action.name] = action.mask
      return newState

    case 'DELETE_AD':
      delete newState[action.id]
      return newState

    default:
      return state
  }
}


export default ads
