
const DEFAULT = {
  image: null,
  url: null,
  title: 'HELLO',
}


const source = (state=DEFAULT, action) => {
  var newState = Object.assign({}, state);
  switch (action.type) {

    case 'UPDATE_SOURCE':
      var source = {
        ...state,
        url: action.url,
        title: action.title,
        image: action.image,
      }
      return source

    default:
      return state
  }
}

export default source;
