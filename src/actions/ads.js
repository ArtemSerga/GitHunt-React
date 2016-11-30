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


