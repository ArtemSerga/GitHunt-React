const getAction = (component) => {
  return {
    component: component.constructor.name,
    name: component.props.name,
  }
}


export const recordFocus = (component) => {
  return {
    type: 'RECORD_FOCUS',
    ...getAction(component)
  }
}


export const recordHover = (component) => {
  return {
    type: 'RECORD_HOVER',
    ...getAction(component)
  }
}


export const recordClick = (component) => {
  return {
    type: 'RECORD_CLICK',
    ...getAction(component)
  }
}

