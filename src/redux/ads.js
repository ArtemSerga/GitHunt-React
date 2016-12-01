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


const ads = (state=[], action) => {

  switch (action.type) {
    case 'ADD_AD':
      return [
          ...state,
          getEmptyAd(action.id),
      ]

    case 'EDIT_AD':
      return state.map(ad => {
        if (ad.id == action.id) {
          ad[action.name] = action.mask
        }
        return ad
      })

    case 'DELETE_AD':
      return state.filter(ad => {
        return ad.id != action.id
      })

    default:
      return state
  }
}


export default ads
