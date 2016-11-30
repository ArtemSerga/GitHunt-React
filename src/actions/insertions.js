export const editInsertion = (name, value) => {
  return {
    type: 'EDIT_INSERTION',
    name,
    value,
  }
}


export const clearInsertion = (name, value) => {
  return {
    type: 'INSERTION_CLEAR',
    name,
    value,
  }
}



