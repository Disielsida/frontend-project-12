export default {
  translation: {
    header: {
      brand: 'Hexlet Chat',
      exit: 'Выйти',
    },

    loginPage: {
      login: 'Войти',
      noAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
    },

    placeholders: {
      yourNick: 'Ваш ник',
      password: 'Пароль',
      messageControl: 'Введите сообщение...',
      userName: 'Имя пользователя',
      confirmPassword: 'Подтвердите пароль',
      channelName: 'Имя канала',
      channelManagement: 'Управление каналом',
    },

    buttons: {
      exit: 'Выйти',
      login: 'Войти',
      send: 'Отправить',
      toRegistrate: 'Зарегестрироваться',
      cancel: 'Отменить',
      delete: 'Удалить',
    },

    notFoundPage: {
      notFound: 'Страница не найдена',
      butYouCanGo: 'Но вы можете перейти',
      onMainPage: 'на главную страницу',
    },

    channelsList: {
      channels: 'Каналы',
      channel: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },
    },

    messagesList: {
      messages: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      newMessage: 'Новое сообщение',
    },

    registrationPage: {
      registration: 'Регистрация',
    },

    errors: {
      emptyMessage: 'Поле не должно быть пустым или состоять из пробелов',
      RequiredField: 'Обязательное поле',
      minMaxRange: 'От 3 до 20 символов',
      mustBeUnique: 'Должно быть уникальным',
      atLeastSix: 'Не менее 6 символов',
      passwordsMustMatch: 'Пароли должны совпадать',
      channelNotDelete: 'Ошибка при удалении канала: ',
      channelNotAdd: 'Ошибка при создании канала: ',
      channelNotRename: 'Ошибка при переименовании канала: ',
    },

    modals: {
      addModal: {
        addChannel: 'Добавить канал',
      },
      removeModal: {
        removeChannel: 'Удалить канал',
        areYouSure: 'Уверены?',
      },
      renameModal: {
        renameChannel: 'Переименовать канал',
      },
    },

    toastify: {
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',
      channelCreated: 'Канал создан',
      errors: {
        channelNotAdd: 'Ошибка при создании канала',
        channelNotDelete: 'Ошибка при удалении канала',
        channelNotRename: 'Ошибка при переименовании канала',
        network: 'Соединение с интернетом прервано',
      },
    },
  },
};
