export const setActive = (component, value) => {
  return {
    type: 'SET_ACTIVE',
    component,
    value
  }
}

export const toggle = (component, value) => {
  return {
    type: 'TOGGLE',
    component,
    value
  }
}

