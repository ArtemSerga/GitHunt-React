export const DEFAULT_INSERTIONS = {
  CATEGORY: {
    'label': 'КАТЕГОРИЯ',
    'placeholder': 'введите категорию',
    // 'value': 'Телефон',
    'value': '',
  },
  BRAND: {
    'label': 'БРЕНД',
    'placeholder': 'введите бренд',
    'value': '',
    // 'value': 'Apple',
  },
  MODEL: {
    'label': 'МОДЕЛЬ',
    'placeholder': 'введите модель',
    // 'value': 'iPhone 7 32G Gold',
    'value': '',
  },
  PRICE: {
    'label': 'ЦЕНА',
    'placeholder': 'введите цену',
    'value': '',
  },
  // OLD_PRICE: {
  //   'label': 'БЫЛА_ЦЕНА',
  //   'placeholder': 'введите старую цену',
  //   'value': '',
  // },
  DISCOUNT: {
    'label': 'СКИДКА',
    'placeholder': 'введите % скидки',
    'value': '',
  },
  COUNTRY: {
    'label': 'СТРАНА',
    'placeholder': 'введите страну производителя',
    'value': '',
  },
}


const insertions = (state=DEFAULT_INSERTIONS, action) => {
  var newState = Object.assign({}, state);
  switch (action.type) {
    case 'EDIT_INSERTION':
      newState[action.name]['value'] = action.value;
      return newState;

    case 'INSERTION_CLEAR':
      newState[action.name]['value'] = '';
      return newState;

    default:
      return state
  }
}

export default insertions;
