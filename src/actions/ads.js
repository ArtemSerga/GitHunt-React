import { v4 } from 'node-uuid'

export const addAd = () => {
  const id = v4()
  return {type: 'ADD_AD', id:id}
}



export const deleteAd = (id) => {
  return {
    type: 'DELETE_AD',
    id,
  }
}


export const editAd = ({id, name, mask}) => {
  return {
    type: 'EDIT_AD',
    id,
    name,
    mask
  }
}




//
//
// import {
//   asyncGetAds,
//   asyncAddAd,
// } from './graphQLFetcher'
//
//
// const ASYNC_ACTION = 'ASYNC_ACTION'
// const DELETE_AD = 'DELETE_AD'
// const EDIT_AD = 'EDIT_AD'
// const ADD_AD = 'ADD_AD'
// const RECEIVE_ADS = 'RECEIVE_ADS'
//
//
// const asyncAction = () => {
//   return {
//     type: ASYNC_ACTION
//   }
// }
//
//
// export const receiveAds = () => {
//   return (dispatch) => {
//     dispatch(asyncAction())
//     return asyncGetAds()
//       .then(adList => dispatch({
//         type: RECEIVE_ADS,
//         ads: adList.ads
//       }))
//   }
// }
//
//
// export const addAd = () => {
//   return (dispatch) => {
//     dispatch(asyncAction())
//     return asyncAddAd()
//       .then(id => {
//         dispatch({
//           type: ADD_AD,
//           id: id
//         })
//       })
//   }
// }
//
//
//
// export const deleteAd = (id) => {
//   return {
//     type: DELETE_AD,
//     id,
//   }
// }
//
//
// export const editAd = ({id, name, mask}) => {
//   return {
//     type: EDIT_AD,
//     id,
//     name,
//     mask
//   }
// }
//
//
