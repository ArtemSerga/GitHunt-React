export const DEFAULT_TARGETS = {
  YANDEX_DIRECT: {
    id: 'YANDEX_DIRECT',
    label: 'Я.Директ',
    fields: {
      headline: {
        placeholder: 'Заголовок',
        max: 33,
      },
      body: {
        placeholder: 'Текст объявления',
        max: 75,
      }
    },
  },
  GOOGLE_ADWORDS: {
    id: 'GOOGLE_ADWORDS',
    label: 'AdWords',
    fields: {
      headline1: {
        placeholder: 'Заголовок 1',
        max: 30,
      },
      headline2: {
        placeholder: 'Заголовок 2',
        max: 30,
      },
      body: {
        placeholder: 'Описание',
        max: 80,
      }
    },
  },
  // FACEBOOK: {
  //   active: false,
  //   label: 'FB',
  //   fields: {
  //     headline: {
  //       max: 30,
  //     },
  //     headline_2: {
  //       max: 30,
  //     },
  //     body: {
  //       max: 80,
  //     }
  //   },
  // },
  // VKONTAKTE: {
  //   active: false,
  //   label: 'VK',
  //   fields: {
  //     headline: {
  //       max: 30,
  //     },
  //     headline_2: {
  //       max: 30,
  //     },
  //     body: {
  //       max: 80,
  //     }
  //   },
  // },
}


const targets = (state=DEFAULT_TARGETS, action) => {
  return DEFAULT_TARGETS
  switch (action.type) {

    default:
      return state
  }
}

export default targets;
